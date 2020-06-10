import styled from 'styled-components';

const MembersList = styled.div`
    list-style-type: none;
    max-height: 200px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
`;

const NoMatchingResults = styled.div`
    height: 150px;
    border-radius: 0.5rem;
    display: flex;
    background: #e9ecef;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    font-weight: bold;
    color: rgba(108, 117, 125, 0.5);
`;

export { MembersList, NoMatchingResults };
