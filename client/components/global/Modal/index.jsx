import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalTitle, CloseButton } from './style';

const noop = () => {};

function _Modal({
    onClose,
    children,
    closingDisabled,
    outsideClosingDisabled,
    title,
    _cssOuter,
    _cssInner,
    responsive = true,
}) {
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
            css={_cssOuter}
        >
            <ModalContent
                onClick={(event) => event.stopPropagation()}
                css={_cssInner}
                responsive={responsive}
            >
                {title && <ModalTitle>{title}</ModalTitle>}
                <CloseButton onClick={closingDisabled ? noop : onClose}>
                    &times;
                </CloseButton>
                {children}
            </ModalContent>
        </Modal>
    );
}

export default _Modal;
