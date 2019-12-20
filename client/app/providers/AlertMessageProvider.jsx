import React, { createContext, useState } from 'react';
import styled from 'styled-components';
import AlertMessage from '../sharedComponents/AlertMessage';

const AlertMessageContainer = styled.div`
    position: fixed;
    z-index: 999;
    right: 0;
    bottom: 0;
    margin: 20px;
    width: 300px;
`;

const AlertMessageContext = createContext(null);

function AlertMessageProvider({ children }) {
    const [alertMessage, setAlertMessage] = useState(null);

    function showAlertMessage({ text, fail, success, zIndex }) {
        setAlertMessage({ text, fail, success, zIndex });
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
                <AlertMessageContainer>
                    <AlertMessage
                        onClose={removeAlertMessage}
                        fail={alertMessage.fail}
                        success={alertMessage.success}
                    >
                        {alertMessage.text}
                    </AlertMessage>
                </AlertMessageContainer>
            )}
        </AlertMessageContext.Provider>
    );
}

export { AlertMessageContext, AlertMessageProvider };
