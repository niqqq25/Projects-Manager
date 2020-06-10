import styled from 'styled-components';
import { card } from '../../../global/styles/card';

const ProjectCard = styled.div`
    ${card}
    width: 300px;
    margin: 1.25rem;
    &:hover {
        transform: scale(1.1);
    }
`;

const ProjectCardContent = styled.div`
    padding: 1.25rem;
`;

const ProjectTitle = styled.h1`
    font-size: 0.94rem;
`;

const ProjectDescription = styled.p`
    padding-top: 0.3125rem;
    font-size: 0.8125rem;
    color: grey;
`;

export { ProjectCard, ProjectCardContent, ProjectTitle, ProjectDescription };
