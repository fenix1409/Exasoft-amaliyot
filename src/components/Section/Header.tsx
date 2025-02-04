import { LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";
import AddModal from "../Modal/Addmodal";
import LogoutModal from "../Modal/LogoutModal";

const Header = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isOpenLogoutModal, setIsLogoutModal] = useState<boolean>(false)
    const name = JSON.parse(localStorage.getItem("user")).username || ""


    const openModal = () => {
        setIsOpenModal(true)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const openLogoutModal = () => {
        setIsLogoutModal(true)
    }

    return (
        <div>
            <div className="w-full bg-[#313131] py-[16px] px-[15px] flex justify-between items-center">
                <strong className="text-[14px] leading-[22px] font-bold text-white">Companies</strong>
                <div className="flex items-center gap-[17px]">
                    <div className="flex items-center gap-[10px]">
                        <strong className="text-[14px] leading-[22px] font-bold text-white">User: </strong>
                        <strong className="text-[14px] leading-[22px] font-bold text-white">{name}</strong>
                    </div>
                    <button onClick={openLogoutModal} className="w-[25px]"><LogoutOutlined style={{ color: "white" }} size={25} /></button>
                    <button className="w-[166px] py-[4px] px-[15px] inline-block text-[14px] leading-[22px] text-white bg-[#08979C]" onClick={openModal}>Add Company</button>
                </div>
            </div>
            <AddModal isOpen={isOpenModal} closeModal={closeModal} />
            <LogoutModal isOpen={isOpenLogoutModal} closeModal={() => setIsLogoutModal(false)} />
        </div>
    )
}

export default Header