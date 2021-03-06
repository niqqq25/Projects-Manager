import styled from 'styled-components';

const TaskInfo = styled.div`
    padding-top: 16px;
`;

const TaskTitle = styled.h1`
    margin-bottom: 12px;
    white-space: pre-wrap;
    color: ${({ theme }) => theme.text.primary};
    text-decoration: ${({ completed }) =>
        completed ? 'line-through' : 'none'};
`;

const TaskDescription = styled.p`
    font-size: 20px;
    color: ${({ theme }) => theme.text.alt};
    margin-bottom: 32px;
    white-space: pre-wrap;
`;

export { TaskInfo, TaskTitle, TaskDescription };
