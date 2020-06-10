import styled from 'styled-components';

const ProjectPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.25rem 1.25rem 1.25rem;
`;

const ProjectContent = styled.div`
    width: 800px;
    @media (max-width: 1000px) {
        width: 90%;
    }
`;

export { ProjectPage, ProjectContent };
