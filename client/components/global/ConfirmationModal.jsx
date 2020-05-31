import React from 'react';
import {
    ConfirmationModal,
    ConfirmationModalInner,
    ButtonWrapper,
    ButtonsWrapper,
    SpinnerWrapper,
} from './styled/ConfirmationModal';

import Modal from './Modal';
import Button from './Button';
import Spinner from './Spinner';

import { connect } from 'react-redux';
import { closeConfirmation } from '../../redux/private/actions/confirmation';

function _ConfirmationModal({ onClose, isLoading, onConfirm }) {
    return (
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
                                onClick={onConfirm}
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
    );
}

const ConnectedConfirmationModal = connect(
    ({ confirmation, requests }) => ({
        isLoading: requests.includes(confirmation.type),
        onConfirm: confirmation.callback,
    }),
    (dispatch) => ({
        onClose: () => dispatch(closeConfirmation()),
    })
)(_ConfirmationModal);

export default ConnectedConfirmationModal;
