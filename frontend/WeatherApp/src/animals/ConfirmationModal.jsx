import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">
                <button className="close-button" onClick={onClose}>&times;</button>
            </div>
            <div className="icon-box">
                <div className="icon">✖</div>
            </div>
            <div className="modal-body">
                <h2>Are you sure?</h2>
                <p>Do you really want to delete these records? This process cannot be undone.</p>
                <div className="modal-actions">
                    <button className="popup-cancel-button" onClick={onClose}>Cancel</button>
                    <button className="erase-button" onClick={onConfirm}>Delete</button></div>
            </div>
        </div>
    </div>
  );
};

export default ConfirmationModal;