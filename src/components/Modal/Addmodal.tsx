import { Input, Modal } from "antd";
import React, { useState } from "react";
import { instance } from "../../hook/useAxios";

interface AddModalProps {
    isOpen: boolean
    closeModal: () => void
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, closeModal }) => {
    const [name, setName] = useState<string>("")
    const [number, setNumber] = useState<number>(0)
    const token = localStorage.getItem("authToken") || "" 

    function handleAdd(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = { name, number };
        try {
            instance().post('/companies/add', data, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            }).then((response) => {
                console.log(response)
                // closeModal()
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal title={"Create Company"} open={isOpen} onCancel={closeModal} className="pl-[16px] py-[24px]" footer={null}>
            <form onSubmit={handleAdd} className="space-y-[21px]">
                <label className="flex items-center gap-[116px]">
                    <p className="text-[14px] leading-[22px]">Name</p>
                    <Input placeholder="Name of the company" size="large" onChange={(e) => setName(e.target.value)} type="text"/>
                </label>
                <label className="flex items-center gap-[116px]">
                    <p className="text-[14px] leading-[22px]">Numpbers</p>
                    <Input placeholder="Count of the workers" size="large" onChange={(e) => setNumber(Number(e.target.value))} type="number"/>
                </label>
                <button className="w-[166px] py-[4px] px-[15px] text-[14px] leading-[22px] text-white bg-[#1890FF] mx-auto block">Add Company</button>
            </form>
        </Modal>
    )
}

export default AddModal