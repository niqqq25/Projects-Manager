import React from 'react';
import { TiPlus } from 'react-icons/ti';
import { taskCreateButton } from './styles/TaskCreateButton';
import { CreateButton } from '../../global/buttons';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _TaskCreateButton({ projectId, parentTask }) {
    const dispatch = useDispatch();

    return (
        <CreateButton
            _css={taskCreateButton}
            onClick={() =>
                dispatch(
                    openModal({
                        type: MODALS.TASK_CREATE,
                        payload: { projectId, parentTask },
                    })
                )
            }
        >
            <TiPlus size="1.2em" />
            New Task
        </CreateButton>
    );
}

export default _TaskCreateButton;
