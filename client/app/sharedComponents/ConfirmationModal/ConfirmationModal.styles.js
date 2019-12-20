import styled from 'styled-components';

const ConfirmationModal = styled.div`
    position: relative;
    z-index: 999;
`;

const ConfirmationModal__Inner = styled.div`
    text-align: center;
    width: 250px;
`;

const ConfirmationModal__SpinnerContainer = styled.div`
    position: absolute;
    height: 40px;
    width: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ConfirmationModal__Text = styled.p``;

const ConfirmationModal__ButtonsWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
`;

const ConfirmationModal__ButtonContainer = styled.div`
    flex: 1;
    margin: 0 15px;
`;

export default {
    ConfirmationModal,
    ConfirmationModal__SpinnerContainer,
    ConfirmationModal__Text,
    ConfirmationModal__Inner,
    ConfirmationModal__ButtonsWrapper,
    ConfirmationModal__ButtonContainer,
};
