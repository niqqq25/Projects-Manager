import React from 'react';

import { TaskInfo, TaskTitle, TaskDescription } from './styles/TaskInfo';
import TaskAssignee from './TaskAssignee';

const _TaskInfo = ({ title, description, assignee, isCompleted }) => (
    <TaskInfo>
        <TaskTitle completed={isCompleted}>{title}</TaskTitle>
        <TaskDescription>{description}</TaskDescription>
        <TaskAssignee assignee={assignee} />
    </TaskInfo>
);

export default _TaskInfo;
