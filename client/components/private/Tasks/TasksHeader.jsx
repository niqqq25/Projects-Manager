import React from 'react';
import { TasksHeader, Title } from './styled/TasksHeader';
import TaskCreateButton from './TaskCreateButton';

const _TasksHeader = ({ projectId, parentTaskId }) => (
    <TasksHeader>
        <Title>Tasks</Title>
        <TaskCreateButton projectId={projectId} parentTaskId={parentTaskId}>
            Create Task
        </TaskCreateButton>
    </TasksHeader>
);

export default _TasksHeader;
