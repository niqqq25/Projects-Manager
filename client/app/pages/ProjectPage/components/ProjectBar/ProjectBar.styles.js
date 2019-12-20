import styled from 'styled-components';

const ProjectBar = styled.div`
    display: flex;
    margin: 10px 0;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2px solid rgb(224, 224, 224);
    padding: 0 10px 5px 10px;
`;

const ProjectBar__Title = styled.p`
    font-size: 40px;
`;

const ProjectBar__Title__Type = styled.span`
    text-transform: capitalize;
    margin-left: 5px;
    font-size: 14px;
`;

const ProjectBar__ButtonContainer = styled.div`
    width: 100px;
`;

export default {
    ProjectBar,
    ProjectBar__Title,
    ProjectBar__Title__Type,
    ProjectBar__ButtonContainer,
};
