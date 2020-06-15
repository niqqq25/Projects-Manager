import React from 'react';
import ProgressBar from '../../global/ProgressBar';

function ProjectCardProgressBar({ tasksCount, completedTasksCount }) {
    const completedTasksRatio = tasksCount
        ? completedTasksCount / tasksCount
        : 0;

    return <ProgressBar percentage={completedTasksRatio} />;
}

export default ProjectCardProgressBar;
