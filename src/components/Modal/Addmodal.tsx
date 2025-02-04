import { Input, Modal } from "antd"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { instance } from "../../hook/useAxios"

interface AddModalProps {
    isOpen: boolean
    closeModal: () => void
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, closeModal }) => {
    const [name, setName] = useState<string>("")
    const [count, setCount] = useState<number>(0)
    const token = localStorage.getItem("authToken") || ""
    const queryClient = useQueryClient()

    const addCompany = async () => {
        const data = { name, count }
        return instance().post('/companies/add', data, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        })
    }

    const mutation = useMutation({
        mutationFn: addCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] })
            closeModal()
        }
    })

    function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        mutation.mutate()
    }

    return (
        <Modal title={"Create Company"} open={isOpen} onCancel={closeModal} footer={null}>
            <form onSubmit={handleAdd} className="space-y-[21px]">
                <label className="flex items-center gap-[116px]">
                    <p className="text-[14px] leading-[22px]">Name</p>
                    <Input placeholder="Name of the company" size="large" onChange={(e) => setName(e.target.value)} type="text"/>
                </label>
                <label className="flex items-center gap-[116px]">
                    <p className="text-[14px] leading-[22px]">Numbers</p>
                    <Input placeholder="Count of the workers" size="large" onChange={(e) => setCount(Number(e.target.value))} type="number"/>
                </label>
                <button type="submit" className="w-[166px] py-[4px] px-[15px] text-[14px] leading-[22px] text-white bg-[#1890FF] mx-auto block" disabled={mutation.isPending} >
                    {mutation.isPending ? "Adding..." : "Add Company"}
                </button>
            </form>
        </Modal>
    )
}

export default AddModal