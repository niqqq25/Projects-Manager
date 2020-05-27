import styled from 'styled-components';

const ProjectHeader = styled.div`
    display: flex;
    margin: 10px 0;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid rgb(224, 224, 224);
    padding: 0 10px 5px 10px;
`;

const ProjectTitle = styled.p`
    font-size: 40px;
`;

const ProjectDescriber = styled.span`
    text-transform: capitalize;
    margin-left: 5px;
    font-size: 14px;
`;

const ButtonWrapper = styled.div``;

export { ProjectHeader, ProjectTitle, ProjectDescriber, ButtonWrapper };
