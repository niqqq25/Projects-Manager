import React from 'react';
import {
    ProjectsPageSubHeader,
    Title,
    ProjectCreateButton,
} from './styled/ProjectsPageSubHeader';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

import { TiPlus } from 'react-icons/ti';

function _ProjectsPageSubHeader() {
    const dispatch = useDispatch();

    return (
        <ProjectsPageSubHeader>
            <Title>Projects</Title>
            <ProjectCreateButton
                onClick={() => dispatch(openModal(MODALS.PROJECT_CREATE))}
            >
                <TiPlus size="1.2em" />
                New Project
            </ProjectCreateButton>
        </ProjectsPageSubHeader>
    );
}

export default _ProjectsPageSubHeader;
