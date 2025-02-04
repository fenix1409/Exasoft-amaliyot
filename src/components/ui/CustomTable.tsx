import { Table, Button, Popover } from "antd";
import { useEffect, useState } from "react";
import { instance } from "../../hook/useAxios";
import { MoreOutlined } from "@ant-design/icons"; 

const CustomTable = () => {
    const [companies, setCompanies] = useState([])
    const token = localStorage.getItem("authToken") || ""

    useEffect(() => {
        instance().get("/companies/get-all", {
            params: {
                search: "",
                PageSize: 10,
                PageIndex: 1
            },
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        })
        .then((res) => {
            console.log("API Response:", res.data)
            setCompanies(
                res.data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    employeeCount: item.count
                }))
            )
        })
        .catch((error) => {
            console.error("Error fetching companies:", error)
        })
    }, [token])

    // Popover ichidagi harakatlar
    const handleEdit = (id: string) => {
        console.log("Edit company:", id)
    }

    const handleDelete = (id: string) => {
        console.log("Delete company:", id)
    }

    const renderActions = (id: string) => (
        <div className="flex flex-col gap-2">
            <button onClick={() => handleEdit(id)} className="text-blue-500 cursor-pointer">Edit</button>
            <button onClick={() => handleDelete(id)} className="text-red-500 cursor-pointer">Delete</button>
        </div>
    )

    const columns = [
        {
            title: "Название компании",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Количество сотрудников",
            dataIndex: "employeeCount",
            key: "employeeCount"
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: any) => (
                <Popover content={renderActions(record.id)} trigger="click">
                    <Button shape="circle" icon={<MoreOutlined />} />
                </Popover>
            )
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={companies}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    )
}

export default CustomTable
