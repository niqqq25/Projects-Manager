import React from 'react';
import { ProgressBar, ProgressBarInner } from './styled/TaskCardProgressBar';

function TaskCardProgressBar({ tasksCount, completedTasksCount }) {
    const completedTasksRatio = tasksCount
        ? (completedTasksCount / tasksCount) * 100
        : 0;

    return (
        <ProgressBar>
            <ProgressBarInner percentage={completedTasksRatio} />
        </ProgressBar>
    );
}

export default TaskCardProgressBar;
