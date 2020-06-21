import styled, { css } from 'styled-components';

const ProjectCardContent = styled.div`
    padding: 20px;
`;

const ProjectTitle = styled.h1`
    font-size: 15px;
    color: ${({ theme }) => theme.text.primary};
`;

const ProjectDescription = styled.p`
    padding-top: 5px;
    font-size: 13px;
    color: ${({ theme }) => theme.text.alt};
`;

const projectCard = css`
    width: 300px;
    margin: 20px;
    &:hover {
        transform: scale(1.1);
    }
`;

export { ProjectCardContent, ProjectTitle, ProjectDescription, projectCard };
