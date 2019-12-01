import React from 'react';
import './taskBar.css';

import Button from '../../../sharedComponents/Button/Button';
import TaskBreadcrumb from '../TaskBreadcrumb/TaskBreadcrumb';

export default function TaskBar({ onTaskEdit, task = {}, history }) {
    return (
        <div id="task-bar">
            <div className="task-bar-left-side">
                <TaskBreadcrumb task={task} history={history} />
                <p id="task-name">
                    {task.title}
                    <span className="item-type">(Task)</span>
                </p>
                <p id="task-assignee">
                    Assignee:{' '}
                    <span id="task-assignee-username">
                        {task.assignee ? task.assignee.username : 'None'}
                    </span>
                </p>
            </div>
            <div className="task-bar-right-side">
                <Button value="Edit" onClick={onTaskEdit} />
            </div>
        </div>
    );
}
