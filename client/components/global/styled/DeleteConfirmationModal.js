import styled from 'styled-components';
import { button, disabledButton } from '../styles/button';

const DeleteConfirmationModal = styled.div`
    position: relative;
    z-index: 999;
`;

const ModalInner = styled.div`
    text-align: center;
    width: 300px;
`;

const ModalTitle = styled.h1`
    color: rgb(98, 98, 98);
    font-size: 1.6em;
    font-weight: normal;
    text-shadow: 0px 0px 1px rgb(98, 98, 98);
    margin-bottom: 5px;
`;

const ModalDescription = styled.p`
    margin: 25px 0;
    color: rgb(185, 173, 178);
    text-shadow: 0px 0px 1px rgb(185, 173, 178);
    font-size: 0.9em;
`;

const ModalButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

const CancelButton = styled.a`
    ${button}
    border-radius: 0.25rem;
    padding: 10px 15px;
    color: darkgrey;
    border: 2px solid darkgrey;
    &:hover {
        background-color: #e4e4e4;
    }
    ${({ disabled }) => disabled && disabledButton}
`;

const DeleteButton = styled.a`
    ${button}
    color: white;
    background-color: rgb(241, 94, 94);
    border-radius: 0.25rem;
    padding: 10px 15px;
    &:hover {
        filter: brightness(90%);
    }
    ${({ disabled }) => disabled && disabledButton}
`;

const SpinnerWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export {
    DeleteConfirmationModal,
    ModalInner,
    ModalTitle,
    ModalDescription,
    ModalButtonsWrapper,
    CancelButton,
    DeleteButton,
    SpinnerWrapper,
};
