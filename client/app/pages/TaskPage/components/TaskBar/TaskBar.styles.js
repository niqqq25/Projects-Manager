import styled from 'styled-components';

const TaskBar = styled.div`
    margin: 10px 0;
    border-bottom: 2px solid rgb(224, 224, 224);
    padding: 0 10px 5px 10px;
`;

const TaskBar__MainContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const MainContent__LeftSide = styled.div``;

const MainContent__RightSide = styled.div``;

const Task__Name = styled.p`
    font-size: 40px;
`;

const Task__Type = styled.span`
    text-transform: capitalize;
    margin-left: 5px;
    font-size: 14px;
`;

const Task__Assignee = styled.p`
    font-size: 14px;
`;

const Task__Assignee__Username = styled.span``;

export default {
    TaskBar,
    TaskBar__MainContent,
    Task__Assignee,
    Task__Assignee__Username,
    Task__Name,
    Task__Type,
    MainContent__LeftSide,
    MainContent__RightSide,
};
