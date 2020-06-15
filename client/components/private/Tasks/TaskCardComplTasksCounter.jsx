import React from 'react';
import { MdPlaylistAddCheck } from 'react-icons/md';
import {
    ComplTasksCounter,
    ComplTasksCounterText,
} from './styles/TaskCardComplTasksCounter';

function TaskCardComplTasksCounter({ tasksCount, completedTasksCount }) {
    return (
        <ComplTasksCounter>
            <MdPlaylistAddCheck size={24} />
            <ComplTasksCounterText>{`${completedTasksCount} / ${tasksCount}`}</ComplTasksCounterText>
        </ComplTasksCounter>
    );
}

export default TaskCardComplTasksCounter;
