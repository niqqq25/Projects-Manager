import React from 'react';
import Styled from './AlertMessage.styles';

export default function AlertMessage({
    success,
    fail,
    onClose = () => {},
    children,
}) {
    return (
        <Styled.AlertMessageContainer>
            <Styled.AlertMessage success={success} fail={fail}>
                <Styled.AlertMessage__Text>
                    {children}
                </Styled.AlertMessage__Text>
                <Styled.AlertMessage__CloseSymbol
                    type="button"
                    onClick={onClose}
                >
                    &times;
                </Styled.AlertMessage__CloseSymbol>
            </Styled.AlertMessage>
        </Styled.AlertMessageContainer>
    );
}
