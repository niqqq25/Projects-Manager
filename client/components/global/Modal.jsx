import React, { useEffect } from 'react';
import { Modal, ModalContent, CloseButton } from './styled/Modal';

const noop = () => {};

function _Modal({ onClose, children, closingDisabled, outsideClosingDisabled }) {
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
        <Modal
            onClick={closingDisabled || outsideClosingDisabled ? noop : onClose}
        >
            <ModalContent onClick={event => event.stopPropagation()}>
                <CloseButton onClick={closingDisabled ? noop : onClose}>
                    &times;
                </CloseButton>
                {children}
            </ModalContent>
        </Modal>
    );
}

export default _Modal;
