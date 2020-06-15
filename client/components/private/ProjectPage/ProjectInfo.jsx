import React from 'react';

import {
    ProjectInfo,
    ProjectTitle,
    ProjectDescription,
} from './styles/ProjectInfo';
import ProjectMembers from './ProjectMembers';

const _ProjectInfo = ({ title, description, members, owner }) => (
    <ProjectInfo>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDescription>{description}</ProjectDescription>
        <ProjectMembers members={members} owner={owner} />
    </ProjectInfo>
);

export default _ProjectInfo;
