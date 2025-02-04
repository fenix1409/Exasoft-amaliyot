import { Button, Modal, message } from "antd"
import React from "react"
import { instance } from "../../hook/useAxios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface DeleteModalProps {
    isOpen: boolean
    closeModal: () => void
    companyId?: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, companyId }) => {
    const queryClient = useQueryClient()

    const deleteCompany = async () => {
        if (!companyId) return
        const token = localStorage.getItem("authToken") || ""
        await instance().delete(`/companies/delete/by-id`, {
            data:  companyId,
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        })
    }
    
    const { mutate: handleDelete } = useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            message.success("Company deleted successfully!")
            queryClient.invalidateQueries({ queryKey: ["companies"] })
            closeModal();
        },
        onError: (error) => {
            console.error("Error deleting company:", error)
            message.error("Failed to delete company!")
        }
    })

    return (
        <Modal open={isOpen} onCancel={closeModal} footer={null}>
            <p>Are you sure you want to delete this company?</p>
            <div className="flex items-center gap-[25px]">
                <Button danger onClick={() => handleDelete()}>Delete</Button>
                <Button onClick={closeModal}>Cancel</Button>
            </div>
        </Modal>
    )
}

export default DeleteModal