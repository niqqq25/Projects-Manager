import React from 'react';
import './taskBreadcrumb.css';

export default function TaskBreadcrumb({ task, history }) {
    function redirectToProject() {
        history.push(`/projects/${task.project._id}`);
    }

    function redirectToParentTask() {
        history.push(
            `/projects/${task.project._id}/tasks/${task.parentTask._id}`
        );
    }

    return (
        <div id="task-breadcrumb">
            <a onClick={redirectToProject}>{task.project.title}</a>
            {task.parentTask && (
                <a onClick={redirectToParentTask}>{task.parentTask.title}</a>
            )}
            <a>{task.title}</a>
        </div>
    );
}
