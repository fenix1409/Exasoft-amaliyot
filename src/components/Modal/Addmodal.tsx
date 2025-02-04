import { Input, Modal } from "antd"
import React, { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { instance } from "../../hook/useAxios"

export interface CompanyType {
    id: string
    name: string
    count: number
}

interface AddModalProps {
    isOpen: boolean
    closeModal: () => void
    companyEdit?: CompanyType
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, closeModal, companyEdit }) => {
    const [name, setName] = useState<string>("")
    const [count, setCount] = useState<number>(0)
    const token = localStorage.getItem("authToken") || ""
    const queryClient = useQueryClient()

    useEffect(() => {
        if (companyEdit?.id) {
            setName(companyEdit.name)
            setCount(companyEdit.count)
        } else {
            setName("")
            setCount(0)
        }
    }, [companyEdit])

    const addCompany = async () => {
        const data = { name, count }
        return instance().post('/companies/add', data, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        })
    }

    const resetForm = () => {
        setName("")
        setCount(0)
    }

    const mutation = useMutation({
        mutationFn: (updatedCompany: CompanyType) => {
            if (companyEdit?.id) {
                return instance().put(`/companies/update`, updatedCompany, {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
                })
            } else {
                return addCompany()
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] })
            if (!companyEdit?.id) {
                resetForm()
            }
            closeModal()
        }
    })

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updatedCompany = companyEdit?.id ? { id: companyEdit.id, name, count } : { name, count }
        mutation.mutate(updatedCompany)
    }

    return (
        <Modal title={companyEdit?.id ? "Edit Company" : "Create Company"} open={isOpen} onCancel={closeModal} footer={null}>
            <form onSubmit={handleAdd} className="space-y-[21px]">
                <label className="flex items-center gap-[116px]">
                    <p className="text-[14px] leading-[22px]">Name</p>
                    <Input placeholder="Name of the company" size="large" onChange={(e) => setName(e.target.value)} type="text" value={name} />
                </label>
                <label className="flex items-center gap-[116px]">
                    <p className="text-[14px] leading-[22px]">Numbers</p>
                    <Input placeholder="Count of the workers" size="large" onChange={(e) => setCount(Number(e.target.value))} type="number" value={count} />
                </label>
                <button type="submit" className="w-[166px] py-[4px] px-[15px] text-[14px] leading-[22px] text-white bg-[#1890FF] mx-auto block" disabled={mutation.isPending}>
                    {mutation.isPending ? (companyEdit?.id ? "Updating..." : "Adding...") : (companyEdit?.id ? "Update Company" : "Add Company")}
                </button>
            </form>
        </Modal>
    )
}

export default AddModal