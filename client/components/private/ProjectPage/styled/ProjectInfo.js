import styled from 'styled-components';

const ProjectInfo = styled.div`
    padding-top: 1rem;
`;

const ProjectTitle = styled.h1`
    margin-bottom: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProjectDescription = styled.p`
    font-size: 1.25rem;
    color: rgb(108, 117, 125);
    margin-bottom: 2rem;
`;

export { ProjectInfo, ProjectTitle, ProjectDescription };
