import React, { useEffect } from 'react';
import Styled from './Modal.styles';

const noop = () => {};

export default function Modal(props) {
    const {
        onClose,
        children,
        closingDisabled,
        outsideClosingDisabled,
    } = props;

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        body.style.overflow = 'hidden';
        body.style.height = '100%';

        return () => {
            body.style.overflow = 'auto';
            body.style.height = 'auto';
        };
    }, []);

    return (
        <Styled.Modal
            onClick={closingDisabled || outsideClosingDisabled ? noop : onClose}
        >
            <Styled.Modal__Content onClick={event => event.stopPropagation()}>
                <Styled.Modal__Content__CloseButton
                    onClick={closingDisabled ? noop : onClose}
                >
                    &times;
                </Styled.Modal__Content__CloseButton>
                {children}
            </Styled.Modal__Content>
        </Styled.Modal>
    );
}
