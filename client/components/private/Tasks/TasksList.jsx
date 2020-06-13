import React from 'react';
import { TasksList, NoTasks } from './styled/TasksList';
import TaskCard from './TaskCard';

function _TasksList({ tasks = [] }) {
    if (!tasks.length) {
        return <NoTasks>No tasks found.</NoTasks>;
    }

    return (
        <TasksList>
            {tasks.map((task, index) => (
                <li key={index}>
                    <TaskCard task={task} />
                </li>
            ))}
        </TasksList>
    );
}

export default _TasksList;
