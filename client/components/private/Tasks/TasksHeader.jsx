import React from 'react';
import { TasksHeader, Title } from './styles/TasksHeader';
import TaskCreateButton from './TaskCreateButton';

const _TasksHeader = ({ projectId, parentTask }) => (
    <TasksHeader>
        <Title>Tasks</Title>
        <TaskCreateButton projectId={projectId} parentTask={parentTask}>
            Create Task
        </TaskCreateButton>
    </TasksHeader>
);

export default _TasksHeader;
