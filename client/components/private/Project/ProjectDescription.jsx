import React from 'react';
import {
    ProjectDescription,
    Description,
    DescriptionTitle,
} from './styled/ProjectDescription';

const _ProjectDescription = ({ description }) => (
    <ProjectDescription>
        <DescriptionTitle>Description</DescriptionTitle>
        <Description>{description || 'None'}</Description>
    </ProjectDescription>
);

export default _ProjectDescription;
