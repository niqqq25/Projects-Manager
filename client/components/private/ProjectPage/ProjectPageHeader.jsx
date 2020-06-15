import React from 'react';

import { ProjectPageHeader } from './styles/ProjectPageHeader';
import ProjectPageBreadcrumb from './ProjectPageBreadcrumb';
import ProjectSettingsDropdown from './ProjectSettingsDropdown';

const _ProjectPageHeader = () => (
    <ProjectPageHeader>
        <ProjectPageBreadcrumb />
        <ProjectSettingsDropdown />
    </ProjectPageHeader>
);

export default _ProjectPageHeader;
