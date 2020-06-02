import React from 'react';
import Modal from './Modal';
import Spinner from './Spinner';

import {
    DeleteConfirmationModal,
    ModalInner,
    ModalTitle,
    ModalDescription,
    ModalButtonsWrapper,
    CancelButton,
    DeleteButton,
    SpinnerWrapper,
} from './styled/DeleteConfirmationModal';

const _DeleteConfirmationModal = ({
    isLoading,
    onClose,
    onDelete,
    content,
}) => (
    <DeleteConfirmationModal>
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
                    <DeleteButton disabled={isLoading} onClick={onDelete}>
                        Delete
                    </DeleteButton>
                </ModalButtonsWrapper>
                {isLoading && (
                    <SpinnerWrapper>
                        <Spinner />
                    </SpinnerWrapper>
                )}
            </ModalInner>
        </Modal>
    </DeleteConfirmationModal>
);

export default _DeleteConfirmationModal;
