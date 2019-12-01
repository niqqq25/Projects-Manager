import React, { createContext, useState } from 'react';
import ConfirmationModal from '../sharedComponents/ConfirmationModal/ConfirmationModal';

const ConfirmationModalContext = createContext(null);

const noop = () => {};

function ConfirmationModalProvider({ children }) {
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);

    function removeConfirmationModal() {
        setConfirmationModal(null);
        setLoading(false);
    }

    function setConfirmationModalLoading(boolean) {
        setLoading(boolean);
    }

    return (
        <ConfirmationModalContext.Provider
            value={{
                setConfirmationModal,
                setConfirmationModalLoading,
                removeConfirmationModal,
            }}
        >
            {children}
            {confirmationModal && (
                <ConfirmationModal
                    onClose={removeConfirmationModal}
                    onConfirm={confirmationModal.onConfirm || noop}
                    loading={loading}
                />
            )}
        </ConfirmationModalContext.Provider>
    );
}

export { ConfirmationModalContext, ConfirmationModalProvider };
