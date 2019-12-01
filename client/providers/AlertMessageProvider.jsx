import React, { createContext, useState } from 'react';

import AlertMessage from '../sharedComponents/AlertMessage/AlertMessage';

const AlertMessageContext = createContext(null);

function AlertMessageProvider({ children, location }) {
    const [alertMessage, setAlertMessage] = useState(null);

    function showAlertMessage({ text, fail, zIndex }) {
        if (text) {
            setAlertMessage({
                text,
                fail,
                zIndex,
            });
        }
    }

    function removeAlertMessage() {
        setAlertMessage(null);
    }

    return (
        <AlertMessageContext.Provider
            value={{ removeAlertMessage, showAlertMessage }}
        >
            {children}
            {alertMessage && (
                <AlertMessage
                    onClose={removeAlertMessage}
                    fail={alertMessage.fail}
                >
                    {alertMessage.text}
                </AlertMessage>
            )}
        </AlertMessageContext.Provider>
    );
}

export { AlertMessageContext, AlertMessageProvider };
