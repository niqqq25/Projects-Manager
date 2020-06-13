import React from 'react';

import { TaskInfo, TaskTitle, TaskDescription } from './styled/TaskInfo';
import TaskAssignee from './TaskAssignee';

const _TaskInfo = ({ title, description, assignee }) => (
    <TaskInfo>
        <TaskTitle>{title}</TaskTitle>
        <TaskDescription>{description}</TaskDescription>
        <TaskAssignee assignee={assignee} />
    </TaskInfo>
);

export default _TaskInfo;
