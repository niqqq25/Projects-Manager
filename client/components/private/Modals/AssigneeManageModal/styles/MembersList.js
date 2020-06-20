import styled, { css } from 'styled-components';

const MembersList = styled.div`
    list-style-type: none;
    max-height: 200px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
`;

const noMatchingResults = css`
    width: 100%;
    height: 100px;
    background: ${({ theme }) => theme.bg.hover};
`;

export { MembersList, noMatchingResults };
