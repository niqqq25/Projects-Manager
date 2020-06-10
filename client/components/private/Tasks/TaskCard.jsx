import React from 'react';
import {
    TaskCard,
    TaskCardContent,
    TaskCardContentLeft,
    TaskCardContentRight,
    TaskTitle,
    TaskDescription,
} from './styled/TaskCard';
import TaskCardProgressBar from './TaskCardProgressBar';
import TaskCardAssignee from './TaskCardAssignee';
import TaskCardComplTasksCounter from './TaskCardComplTasksCounter';

import ellipseText from '../../../helpers/ellipseText';
const MAX_DESCRIPTION_LENGTH = 120;

function _TaskCard({ task }) {
    const { title, description, tasks = [], assignee } = task;
    const tasksCount = tasks.length;
    const completedTasksCount = tasks.reduce(
        (acc, { isCompleted }) => acc + (isCompleted ? 1 : 0),
        0
    );

    return (
        <TaskCard>
            <TaskCardContent>
                <TaskCardContentLeft>
                    <TaskTitle>{title}</TaskTitle>
                    <TaskDescription>
                        {ellipseText(description, MAX_DESCRIPTION_LENGTH)}
                    </TaskDescription>
                </TaskCardContentLeft>
                <TaskCardContentRight>
                    <TaskCardAssignee assignee={assignee} />
                    <TaskCardComplTasksCounter
                        tasksCount={tasksCount}
                        completedTasksCount={completedTasksCount}
                    />
                </TaskCardContentRight>
            </TaskCardContent>
            <TaskCardProgressBar
                tasksCount={tasksCount}
                completedTasksCount={completedTasksCount}
            />
        </TaskCard>
    );
}

export default _TaskCard;
