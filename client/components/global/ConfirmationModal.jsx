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

const _ConfirmationModal = ({ onClose, onConfirm, loading }) => (
    <ConfirmationModal>
        <Modal
            onClose={onClose}
            outsideClosingDisabled
            closingEnabled={!loading}
        >
            <ConfirmationModalInner>
                <p>Are you sure you want to do this?</p>
                <ButtonsContainer>
                    <ButtonContainer>
                        <Button
                            value="No"
                            onClick={onClose}
                            disabled={loading}
                        />
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button
                            value="Yes"
                            onClick={onConfirm}
                            disabled={loading}
                        />
                    </ButtonContainer>
                </ButtonsContainer>
                {loading && (
                    <SpinnerContainer>
                        <Spinner />
                    </SpinnerContainer>
                )}
            </ConfirmationModalInner>
        </Modal>
    </ConfirmationModal>
);

export default _ConfirmationModal;
