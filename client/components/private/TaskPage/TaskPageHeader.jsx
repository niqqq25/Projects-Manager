import React from 'react';

import { TaskPageHeader } from './styles/TaskPageHeader';
import TaskPageBreadcrumb from './TaskPageBreadcrumb';
import TaskSettingsDropdown from './TaskSettingsDropdown';

const _TaskPageHeader = ({ project, parentTask }) => (
    <TaskPageHeader>
        <TaskPageBreadcrumb project={project} parentTask={parentTask} />
        <TaskSettingsDropdown />
    </TaskPageHeader>
);

export default _TaskPageHeader;
