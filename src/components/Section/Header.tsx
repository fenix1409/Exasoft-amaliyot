import { LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddModal from "../Modal/Addmodal";

const Header = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    return (
        <div>
            <div className="w-full bg-[#313131] py-[16px] px-[15px] flex justify-between items-center">
                <strong className="text-[14px] leading-[22px] font-bold text-white">Companies</strong>
                <div className="flex items-center gap-[17px]">
                    <button className="w-[25px]"><LogoutOutlined style={{ color: "white" }} size={25} /></button>
                    <button className="w-[166px] py-[4px] px-[15px] inline-block text-[14px] leading-[22px] text-white bg-[#08979C]" onClick={openModal}>Add Company</button>
                </div>
            </div>
            <AddModal isOpen={isOpenModal} closeModal={closeModal} />
        </div>
    )
}

export default Header