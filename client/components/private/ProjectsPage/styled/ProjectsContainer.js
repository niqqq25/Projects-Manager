import styled from 'styled-components';

const ProjectsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const EmptyCard = styled.div`
    height: 0;
    width: 300px;
    padding-top: 20px;
    margin: 0 20px;
`;

export { ProjectsContainer, EmptyCard };
