import React from 'react';
import { TiPlus } from 'react-icons/ti';
import { CreateButton } from '../../global';
import { projectCreateButton } from './styles/ProjectCreateButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _ProjectCreateButton() {
    const dispatch = useDispatch();

    return (
        <CreateButton
            _css={projectCreateButton}
            onClick={() => dispatch(openModal(MODALS.PROJECT_CREATE))}
        >
            <TiPlus size="1.2em" />
            New Project
        </CreateButton>
    );
}

export default _ProjectCreateButton;
