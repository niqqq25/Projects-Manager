import React, { createContext, useState } from 'react';

import { ConfirmationModal } from '../components/global';

const ConfirmationModalContext = createContext(null);

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
                    onConfirm={confirmationModal.onConfirm}
                    loading={loading}
                />
            )}
        </ConfirmationModalContext.Provider>
    );
}

export { ConfirmationModalContext, ConfirmationModalProvider };
