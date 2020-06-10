import React from 'react';
import { TiPlus } from 'react-icons/ti';
import { ProjectCreateButton } from './styled/ProjectCreateButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _ProjectCreateButton() {
    const dispatch = useDispatch();

    return (
        <ProjectCreateButton
            onClick={() => dispatch(openModal(MODALS.PROJECT_CREATE))}
        >
            <TiPlus size="1.2em" />
            New Project
        </ProjectCreateButton>
    );
}

export default _ProjectCreateButton;
