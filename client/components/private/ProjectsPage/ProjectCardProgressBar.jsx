import React from 'react';
import { ProgressBar, ProgressBarInner } from './styled/ProjectCardProgressBar';

function ProjectCardProgressBar({ tasksCount, completedTasksCount }) {
    const completedTasksRatio = tasksCount
        ? completedTasksCount / tasksCount
        : 0;

    return (
        <ProgressBar>
            <ProgressBarInner percentage={completedTasksRatio} />
        </ProgressBar>
    );
}

export default ProjectCardProgressBar;
