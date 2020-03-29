import styled from 'styled-components';

const ConfirmationModal = styled.div`
    position: relative;
    z-index: 999;
`;

const ConfirmationModalInner = styled.div`
    text-align: center;
    width: 250px;
`;

const SpinnerContainer = styled.div`
    position: absolute;
    height: 40px;
    width: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ButtonsContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
    flex: 1;
    margin: 0 15px;
`;

export {
    ConfirmationModal,
    SpinnerContainer,
    ConfirmationModalInner,
    ButtonsContainer,
    ButtonContainer,
};
