import { Table, Button, Popover } from "antd"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { instance } from "../../hook/useAxios"
import { MoreOutlined } from "@ant-design/icons"
import DeleteModal from "../Modal/DeleteModal"
import { useState } from "react"

const fetchCompanies = async () => {
    const token = localStorage.getItem("authToken") || "";
    const response = await instance().get("/companies/get-all", {
        params: {
            search: "",
            PageSize: 10,
            PageIndex: 1
        },
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    })
    return response.data
}

const CustomTable = () => {
    const queryClient = useQueryClient();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [selected, setSelected] = useState<string | null>(null)

    const { data: companies, isLoading } = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies
    })

    const handleEdit = (id: string) => {
        console.log("Edit company:", id)
        queryClient.invalidateQueries({ queryKey: ["companies"] })
    }

    const openDeleteModal = (id: string) => {
        setSelected(id)
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
        setSelected(null)
    }

    // TABLE PART
    const renderActions = (id: string) => (
        <div className="flex flex-col gap-2">
            <button onClick={() => handleEdit(id)} className="text-blue-500">Edit</button>
            <button onClick={() => openDeleteModal(id)} className="text-red-500">Delete</button>
        </div>
    )

    const columns = [
        { title: "Company Name", dataIndex: "name", key: "name" },
        { title: "Employee Count", dataIndex: "count", key: "count" },
        {
            title: "Action",
            key: "action",
            render: (record: any) => (
                <Popover content={renderActions(record.id)} trigger={"click"}>
                    <Button icon={<MoreOutlined />} />
                </Popover>
            )
        }
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={companies || []}
                rowKey="id"
                loading={isLoading}
                pagination={{ pageSize: 10 }}
            />
            <DeleteModal isOpen={isOpenModal} closeModal={closeModal} companyId={selected || undefined} />
        </>
    );
};

export default CustomTable