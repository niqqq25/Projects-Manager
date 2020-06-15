import React from 'react';
import ProgressBar from '../../global/ProgressBar';
import { progressBar } from './styles/TaskCardProgressBar';

function TaskCardProgressBar({ tasksCount, completedTasksCount }) {
    const completedTasksRatio = tasksCount
        ? (completedTasksCount / tasksCount) * 100
        : 0;

    return <ProgressBar _css={progressBar} percentage={completedTasksRatio} />;
}

export default TaskCardProgressBar;
