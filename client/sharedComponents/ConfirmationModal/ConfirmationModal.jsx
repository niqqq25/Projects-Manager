import React from 'react';
import './confirmationModal.css';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';

export default function ConfirmationModal({ onClose, onConfirm, loading }) {
    return (
        <Modal
            onClose={onClose}
            outsideClosingDisabled
            closingEnabled={!loading}
        >
            <p>Are you sure you want to do this?</p>
            <div id="buttons-wrapper">
                <Button value="No" onClick={onClose} disabled={loading} />
                <Button value="Yes" onClick={onConfirm} disabled={loading} />
            </div>
            {loading && (
                <Spinner
                    page
                    style={{
                        height: '26px',
                        width: '26px',
                        margin: '-13px 0 0 -13px',
                    }}
                />
            )}
        </Modal>
    );
}
