import React from 'react';
import Styled from './ConfirmationModal.styles';

import Modal from '../Modal';
import Button from '../Button';
import Spinner from '../Spinner';

export default function ConfirmationModal({ onClose, onConfirm, loading }) {
    return (
        <Styled.ConfirmationModal>
            <Modal
                onClose={onClose}
                outsideClosingDisabled
                closingEnabled={!loading}
            >
                <Styled.ConfirmationModal__Inner>
                    <Styled.ConfirmationModal__Text>
                        Are you sure you want to do this?
                    </Styled.ConfirmationModal__Text>
                    <Styled.ConfirmationModal__ButtonsWrapper>
                        <Styled.ConfirmationModal__ButtonContainer>
                            <Button
                                value="No"
                                onClick={onClose}
                                disabled={loading}
                            />
                        </Styled.ConfirmationModal__ButtonContainer>
                        <Styled.ConfirmationModal__ButtonContainer>
                            <Button
                                value="Yes"
                                onClick={onConfirm}
                                disabled={loading}
                            />
                        </Styled.ConfirmationModal__ButtonContainer>
                    </Styled.ConfirmationModal__ButtonsWrapper>
                    {loading && (
                        <Styled.ConfirmationModal__SpinnerContainer>
                            <Spinner />
                        </Styled.ConfirmationModal__SpinnerContainer>
                    )}
                </Styled.ConfirmationModal__Inner>
            </Modal>
        </Styled.ConfirmationModal>
    );
}
