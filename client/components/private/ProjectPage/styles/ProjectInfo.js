import styled from 'styled-components';

const ProjectInfo = styled.div`
    padding-top: 16px;
`;

const ProjectTitle = styled.h1`
    margin-bottom: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProjectDescription = styled.p`
    font-size: 20px;
    color: ${({ theme }) => theme.text.alt};
    margin-bottom: 32px;
    white-space: pre-wrap;
`;

export { ProjectInfo, ProjectTitle, ProjectDescription };
