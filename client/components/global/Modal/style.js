import styled, { css } from 'styled-components';

const Modal = styled.div`
    position: fixed;
    display: flex;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
    position: relative;
    display: inline-block;
    height: fit-content;
    max-width: 100%;
    background-color: ${({ theme }) => theme.bg.white};
    margin: 100px auto 0 auto;
    border-radius: 15px;
    padding: 30px;
    @media (max-width: 500px) {
        ${({ responsive }) =>
            responsive
                ? css`
                      width: 100%;
                      min-height: 100vh;
                      padding-top: 100px;
                      border-radius: initial;
                      margin: 0;
                  `
                : ''}
    }
`;

const ModalTitle = styled.h2`
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
`;

const CloseButton = styled.a`
    position: absolute;
    right: 0;
    top: 0;
    font-size: 24px;
    margin: 15px 25px 0 0;
    &:hover {
        color: ${({ theme }) => theme.text.main};
        cursor: pointer;
    }
`;

export { Modal, ModalContent, ModalTitle, CloseButton };
