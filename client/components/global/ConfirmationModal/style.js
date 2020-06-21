import styled, { css } from 'styled-components';

const modalOuter = css`
    z-index: 999;
`;

const modalInner = css`
    text-align: center;
    margin: auto;
    width: 350px;
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

const SpinnerWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export {
    ModalTitle,
    ModalDescription,
    ModalButtonsWrapper,
    SpinnerWrapper,
    modalOuter,
    modalInner,
};
