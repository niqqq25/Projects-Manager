import styled from 'styled-components';

const TaskInfo = styled.div`
    padding-top: 1rem;
`;

const TaskTitle = styled.h1`
    margin-bottom: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TaskDescription = styled.p`
    font-size: 1.25rem;
    color: rgb(108, 117, 125);
    margin-bottom: 2rem;
    white-space: pre-wrap;
`;

export { TaskInfo, TaskTitle, TaskDescription };
