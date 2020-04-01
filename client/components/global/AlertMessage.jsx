import React, { useState, useEffect } from 'react';
import {
    AlertMessage,
    AlertMessageContainer,
    CloseButton,
    AlertMessageText,
} from './styles/AlertMessage';

function _AlertMessage({ alertMessage, onClose }) {
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        startTimer();
    }, []);

    useEffect(() => {
        return () => clearTimeout(timer);
    }, [timer]);

    function startTimer() {
        const _timer = setTimeout(() => {
            onClose();
        }, 2000);
        setTimer(_timer);
    }

    const { success, error, content } = alertMessage;

    return (
        <AlertMessageContainer>
            <AlertMessage success={success} error={error}>
                <AlertMessageText>{content}</AlertMessageText>
                <CloseButton type="button" onClick={onClose}>
                    &times;
                </CloseButton>
            </AlertMessage>
        </AlertMessageContainer>
    );
}

export default _AlertMessage;
