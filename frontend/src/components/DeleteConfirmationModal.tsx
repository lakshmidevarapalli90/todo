import React from 'react';
import './modalStyles.css';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <p>Are you sure you want to delete this todo?</p>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onConfirm}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;