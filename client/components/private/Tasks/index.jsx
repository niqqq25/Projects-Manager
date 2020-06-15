import React from 'react';
import { Tasks } from './styles/Tasks';
import TasksHeader from './TasksHeader';
import TasksList from './TasksList';

const _Tasks = ({ tasks, projectId, parentTask }) => (
    <Tasks>
        <TasksHeader projectId={projectId} parentTask={parentTask} />
        <TasksList tasks={tasks} />
    </Tasks>
);

export default _Tasks;
