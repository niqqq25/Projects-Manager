import styled from 'styled-components';

const MainContent = styled.div`
    display: grid;
    grid-template-columns: calc(100% - 300px) 300px;
    grid-gap: 10px;
    padding: 0 10px;
    grid-template-areas: 'b a';
    @media (max-width: 900px) {
        grid-template-columns: 100%;
        grid-template-areas:
            'a'
            'b';
    }
`;

const MainContent__ProjectUsersContainer = styled.div`
    grid-area: a;
    @media (min-width: 900px) {
        border-left: 2px solid;
        border-image: linear-gradient(#f5af19, #f12711) 0 100%;
        padding-left: 15px;
    }
`;

const MainContent__TasksTableContainer = styled.div`
    grid-area: b;
`;

export default {
    MainContent,
    MainContent__ProjectUsersContainer,
    MainContent__TasksTableContainer,
};
