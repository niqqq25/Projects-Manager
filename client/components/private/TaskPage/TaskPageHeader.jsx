import React from 'react';

import { TaskPageHeader } from './styles/TaskPageHeader';
import TaskPageBreadcrumb from './TaskPageBreadcrumb';
import TaskSettingsDropdown from './TaskSettingsDropdown';

const _TaskPageHeader = ({ project, parentTask, isCompleted, taskId }) => (
    <TaskPageHeader>
        <TaskPageBreadcrumb project={project} parentTask={parentTask} />
        <TaskSettingsDropdown isCompleted={isCompleted} taskId={taskId} />
    </TaskPageHeader>
);

export default _TaskPageHeader;
