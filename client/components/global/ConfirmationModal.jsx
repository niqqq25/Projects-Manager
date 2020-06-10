import React from 'react';
import Modal from './Modal';
import Spinner from './Spinner';

import {
    ConfirmationModal,
    ModalInner,
    ModalTitle,
    ModalDescription,
    ModalButtonsWrapper,
    CancelButton,
    ConfirmButton,
    SpinnerWrapper,
} from './styled/ConfirmationModal';

const _ConfirmationModal = ({
    isLoading,
    onClose,
    onConfirm,
    content,
    confirmButtonText,
    success,
}) => (
    <ConfirmationModal>
        <Modal
            onClose={onClose}
            outsideClosingDisabled
            closingDisabled={isLoading}
        >
            <ModalInner>
                <ModalTitle>Are you sure?</ModalTitle>
                <ModalDescription>{content}</ModalDescription>
                <ModalButtonsWrapper>
                    <CancelButton disabled={isLoading} onClick={onClose}>
                        Cancel
                    </CancelButton>
                    <ConfirmButton onClick={onConfirm} success={success}>
                        {confirmButtonText}
                    </ConfirmButton>
                </ModalButtonsWrapper>
                {isLoading && (
                    <SpinnerWrapper>
                        <Spinner />
                    </SpinnerWrapper>
                )}
            </ModalInner>
        </Modal>
    </ConfirmationModal>
);

export default _ConfirmationModal;
