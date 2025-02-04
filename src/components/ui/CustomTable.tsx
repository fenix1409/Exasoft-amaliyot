import { Table, Button, Popover } from "antd"
import { useQuery } from "@tanstack/react-query"
import { instance } from "../../hook/useAxios"
import { MoreOutlined } from "@ant-design/icons"
import DeleteModal from "../Modal/DeleteModal"
import { useState } from "react"
import AddModal, { CompanyType } from "../Modal/Addmodal"

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
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [selected, setSelected] = useState<string | null>(null)
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
    const [editCompany, setEditCompany] = useState<CompanyType | null>(null)

    const { data: companies, isLoading } = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies
    })

    const handleEdit = (company: CompanyType) => {
        setEditCompany(company)
        setIsOpenEditModal(true)
    }

    const openDeleteModal = (id: string) => {
        setSelected(id)
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
        setSelected(null)
    }

    const renderActions = (company: CompanyType) => (
        <div className="flex flex-col gap-2">
            <button onClick={() => handleEdit(company)} className="text-blue-500">Edit</button>
            <button onClick={() => openDeleteModal(company.id)} className="text-red-500">Delete</button>
        </div>
    )

    const columns = [
        { title: "Company Name", dataIndex: "name", key: "name" },
        { title: "Employee Count", dataIndex: "count", key: "count" },
        {
            title: "Action",
            key: "action",
            render: (record: CompanyType) => (
                <Popover content={renderActions(record)} trigger={"click"}>
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
            <AddModal 
                isOpen={isOpenEditModal} 
                closeModal={() => { setIsOpenEditModal(false); setEditCompany(null); }} 
                companyEdit={editCompany || undefined} 
            />
        </>
    )
}

export default CustomTable