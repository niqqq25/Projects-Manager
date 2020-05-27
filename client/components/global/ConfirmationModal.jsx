import React from 'react';
import {
    ConfirmationModal,
    ConfirmationModalInner,
    ButtonWrapper,
    ButtonsWrapper,
    SpinnerWrapper,
} from './styles/ConfirmationModal';

import Modal from './Modal';
import Button from './Button';
import Spinner from './Spinner';

import { connect, useDispatch } from 'react-redux';
import { closeConfirmation } from '../../redux/private/actions/confirmation';
import { deleteCurrentUser } from '../../redux/private/actions/currentUser';
import CURRENT_USER from '../../redux/private/constants/currentUser';

function selectOnConfirmAction(type) {
    switch (type) {
        case CURRENT_USER.DELETE:
            return deleteCurrentUser;
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
                            <ButtonsWrapper>
                                <ButtonWrapper>
                                    <Button
                                        value="No"
                                        onClick={onClose}
                                        disabled={isLoading}
                                    />
                                </ButtonWrapper>
                                <ButtonWrapper>
                                    <Button
                                        value="Yes"
                                        onClick={() => dispatch(onConfirm())}
                                        disabled={isLoading}
                                    />
                                </ButtonWrapper>
                            </ButtonsWrapper>
                            {isLoading && (
                                <SpinnerWrapper>
                                    <Spinner />
                                </SpinnerWrapper>
                            )}
                        </ConfirmationModalInner>
                    </Modal>
                </ConfirmationModal>
            ) : null}
        </>
    );
}

const ConnectedConfirmationModal = connect(
    ({ confirmation, requests }) => ({
        isOpen: !!confirmation,
        isLoading: requests.includes(confirmation),
        onConfirm: selectOnConfirmAction(confirmation),
    }),
    (dispatch) => ({
        onClose: () => dispatch(closeConfirmation()),
    })
)(_ConfirmationModal);

export default ConnectedConfirmationModal;
