import React from 'react';
import { TasksList } from './styles/TasksList';
import { EmptyCard } from '../../global/cards';
import TaskCard from './TaskCard';

function _TasksList({ tasks = [] }) {
    if (!tasks.length) {
        return <EmptyCard>No tasks found.</EmptyCard>;
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
