import React from 'react';

import {
    TaskAssignee,
    TaskAssigneeTitle,
    TaskAssigneeContent,
} from './styles/TaskAssignee';
import { Avatar, Tooltip } from '../../global';
import AssigneeManageButton from './AssigneeManageButton';

const DEFAULT_AVATAR = 'http://www.gravatar.com/avatar/?d=mm';
const DEFAULT_USERNAME = 'Unassigned';

function _TaskAssignee({ assignee }) {
    const avatarUrl = assignee?.avatarUrl || DEFAULT_AVATAR;
    const username = assignee?.username || DEFAULT_USERNAME;

    return (
        <TaskAssignee>
            <TaskAssigneeTitle>Assignee</TaskAssigneeTitle>
            <TaskAssigneeContent>
                <Tooltip content={username}>
                    <Avatar src={avatarUrl} size={40} />
                </Tooltip>
                <AssigneeManageButton assignee={assignee} />
            </TaskAssigneeContent>
        </TaskAssignee>
    );
}

export default _TaskAssignee;
