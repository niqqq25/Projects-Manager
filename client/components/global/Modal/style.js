import styled from 'styled-components';

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
    max-width: 100%;
    background-color: ${({ theme }) => theme.bg.white};
    margin: auto;
    border-radius: 15px;
    padding: 30px;
`;

const CloseButton = styled.a`
    float: right;
    top: 0;
    font-size: 24px;
    margin: -20px -10px 0 0;
    &:hover {
        color: ${({ theme }) => theme.text.main};
        cursor: pointer;
    }
`;

export { Modal, ModalContent, CloseButton };
