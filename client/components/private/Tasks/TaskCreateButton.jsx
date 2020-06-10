import React from 'react';
import { TiPlus } from 'react-icons/ti';
import { TaskCreateButton } from './styled/TaskCreateButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _TaskCreateButton({ projectId, parentTaskId }) {
    const dispatch = useDispatch();

    return (
        <TaskCreateButton
            onClick={() =>
                dispatch(
                    openModal({
                        type: MODALS.TASK_CREATE,
                        payload: { projectId, parentTaskId },
                    })
                )
            }
        >
            <TiPlus size="1.2em" />
            New Task
        </TaskCreateButton>
    );
}

export default _TaskCreateButton;
