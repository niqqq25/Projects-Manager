import React from 'react';
import {
    AlertMessage,
    AlertMessageContainer,
    CloseButton,
    AlertMessageText,
} from './styles/AlertMessage';

const _AlertMessage = ({ success, error, onClose, children }) => (
    <AlertMessageContainer>
        <AlertMessage success={success} error={error}>
            <AlertMessageText>{children}</AlertMessageText>
            <CloseButton type="button" onClick={onClose}>
                &times;
            </CloseButton>
        </AlertMessage>
    </AlertMessageContainer>
);

export default _AlertMessage;
