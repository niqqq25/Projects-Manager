import React from 'react';
import { Tasks } from './styled/Tasks';
import TasksHeader from './TasksHeader';
import TasksList from './TasksList';

const _Tasks = ({ tasks, projectId, parentTaskId }) => (
    <Tasks>
        <TasksHeader projectId={projectId} parentTaskId={parentTaskId} />
        <TasksList tasks={tasks} />
    </Tasks>
);

export default _Tasks;
