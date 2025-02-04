import React from 'react';
import { Modal } from 'antd';

interface LogoutModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, closeModal }) => {
    const handleOk = () => {
        localStorage.clear();
        closeModal();
        window.location.reload();
        location.pathname = '/'
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <Modal title="Logout" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure you want to logout?</p>
        </Modal>
    );
};

export default LogoutModal;