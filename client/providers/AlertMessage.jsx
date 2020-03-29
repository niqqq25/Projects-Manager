import React, { createContext, useState } from 'react';
import styled from 'styled-components';
import AlertMessage from '../components/global/AlertMessage';

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

    return (
        <AlertMessageContext.Provider value={{ setAlertMessage }}>
            {children}
            {alertMessage && (
                <AlertMessageContainer>
                    <AlertMessage
                        onClose={() => setAlertMessage(null)}
                        error={alertMessage.error}
                        success={alertMessage.success}
                    >
                        {alertMessage.content}
                    </AlertMessage>
                </AlertMessageContainer>
            )}
        </AlertMessageContext.Provider>
    );
}

export { AlertMessageContext, AlertMessageProvider };
