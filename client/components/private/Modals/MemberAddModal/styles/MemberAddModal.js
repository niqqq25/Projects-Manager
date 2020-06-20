import styled, { css } from 'styled-components';

const ModalTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 24px;
    text-align: center;
`;

const ModalContent = styled.div`
    width: 400px;
`;

const searchBar = css`
    margin-bottom: 24px;
`;

export { ModalContent, ModalTitle, searchBar };
