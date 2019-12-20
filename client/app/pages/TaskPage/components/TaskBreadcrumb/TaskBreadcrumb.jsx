import React from 'react';
import Styled from './TaskBreadcrumb.styles';

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
        <Styled.TaskBreadcrumb>
            <Styled.TaskBreadcrumb__Link onClick={redirectToProject}>
                {task.project.title}
            </Styled.TaskBreadcrumb__Link>
            {task.parentTask && (
                <Styled.TaskBreadcrumb__Link onClick={redirectToParentTask}>
                    {task.parentTask.title}
                </Styled.TaskBreadcrumb__Link>
            )}
            {task.title}
        </Styled.TaskBreadcrumb>
    );
}
