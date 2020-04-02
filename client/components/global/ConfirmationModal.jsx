import React from 'react';
import {
    ConfirmationModal,
    ConfirmationModalInner,
    ButtonContainer,
    ButtonsContainer,
    SpinnerContainer,
} from './styles/ConfirmationModal';

import Modal from './Modal';
import Button from './Button';
import Spinner from './Spinner';

import { connect, useDispatch } from 'react-redux';
import confirmationActions from '../../redux/private/actions/confirmation';
import currentUserActions, {
    DELETE_USER,
} from '../../redux/private/actions/currentUser';

function selectOnConfirmAction(type) {
    switch (type) {
        case DELETE_USER:
            return currentUserActions._delete;
        default:
            return () => {};
    }
}

function _ConfirmationModal({ onClose, isOpen, isLoading, onConfirm }) {
    const dispatch = useDispatch();

    return (
        <>
            {isOpen ? (
                <ConfirmationModal>
                    <Modal
                        onClose={onClose}
                        outsideClosingDisabled
                        closingDisabled={isLoading}
                    >
                        <ConfirmationModalInner>
                            <p>Are you sure you want to do this?</p>
                            <ButtonsContainer>
                                <ButtonContainer>
                                    <Button
                                        value="No"
                                        onClick={onClose}
                                        disabled={isLoading}
                                    />
                                </ButtonContainer>
                                <ButtonContainer>
                                    <Button
                                        value="Yes"
                                        onClick={() => dispatch(onConfirm())}
                                        disabled={isLoading}
                                    />
                                </ButtonContainer>
                            </ButtonsContainer>
                            {isLoading && (
                                <SpinnerContainer>
                                    <Spinner />
                                </SpinnerContainer>
                            )}
                        </ConfirmationModalInner>
                    </Modal>
                </ConfirmationModal>
            ) : null}
        </>
    );
}

const ConnectedConfirmationModal = connect(
    ({ confirmation, requesting }) => ({
        isOpen: confirmation.isOpen,
        isLoading: requesting.includes(confirmation.type),
        onConfirm: selectOnConfirmAction(confirmation.type),
    }),
    dispatch => ({
        onClose: () => dispatch(confirmationActions.close()),
    })
)(_ConfirmationModal);

export default ConnectedConfirmationModal;
