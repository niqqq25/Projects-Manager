import React from 'react';
import { TaskCardAssignee } from './styles/TaskCardAssignee';
import { Avatar, Tooltip } from '../../global';

const _TaskCardAssignee = ({ assignee }) => (
    <TaskCardAssignee>
        {assignee ? (
            <Tooltip top content={assignee.username}>
                <Avatar src={assignee.avatarUrl} />
            </Tooltip>
        ) : (
            'Unassigned'
        )}
    </TaskCardAssignee>
);

export default _TaskCardAssignee;
