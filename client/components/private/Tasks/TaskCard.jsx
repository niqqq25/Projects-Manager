import React from 'react';
import { withRouter } from 'react-router-dom';
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
import ROUTES from '../../../constants/routes';
const MAX_DESCRIPTION_LENGTH = 120;

function _TaskCard({ task, history }) {
    const { title, description, tasks = [], assignee, _id } = task;
    const tasksCount = tasks.length;
    const completedTasksCount = tasks.reduce(
        (acc, { isCompleted }) => acc + (isCompleted ? 1 : 0),
        0
    );

    return (
        <TaskCard onClick={() => history.push(`${ROUTES.TASK}/${_id}`)}>
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

export default withRouter(_TaskCard);