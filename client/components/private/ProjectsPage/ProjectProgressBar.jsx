import React from 'react';
import {
    ProjectProgressBar,
    ProjectProgressBarInner,
    ProjectProgressBarInnerTitle,
} from './styled/ProjectProgressBar';
import Tooltip from '../../global/Tooltip';

const MIN_VISABLE_RATIO = 15;

function _ProjectProgressBar({ tasks }) {
    const tasksCount = tasks.length;
    const completedTasksCount = tasks.reduce(
        (acc, { isCompleted }) => (acc + isCompleted ? 1 : 0),
        0
    );
    const completedTasksRatio = tasksCount
        ? completedTasksCount / tasksCount
        : 0;
    const isRatioVisable = completedTasksRatio >= MIN_VISABLE_RATIO;

    return (
        <Tooltip content={`${completedTasksCount}/${tasksCount}`}>
            <ProjectProgressBar>
                <ProjectProgressBarInner percentage={completedTasksRatio}>
                    {isRatioVisable && (
                        <ProjectProgressBarInnerTitle>
                            {`${completedTasksRatio}%`}
                        </ProjectProgressBarInnerTitle>
                    )}
                </ProjectProgressBarInner>
            </ProjectProgressBar>
        </Tooltip>
    );
}

export default _ProjectProgressBar;
