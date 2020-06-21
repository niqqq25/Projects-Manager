import React from 'react';
import Modal from '../Modal';
import Spinner from '../Spinner';

import {
    ModalTitle,
    ModalDescription,
    ModalButtonsWrapper,
    SpinnerWrapper,
    modalOuter,
    modalInner,
} from './style';

import { ConfirmButton, CancelButton } from '../buttons';

const _ConfirmationModal = ({
    isLoading,
    onClose,
    onConfirm,
    content,
    confirmButtonText,
    success,
}) => (
    <Modal
        onClose={onClose}
        outsideClosingDisabled
        closingDisabled={isLoading}
        _cssOuter={modalOuter}
        _cssInner={modalInner}
        responsive={false}
    >
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
    </Modal>
);

export default _ConfirmationModal;
