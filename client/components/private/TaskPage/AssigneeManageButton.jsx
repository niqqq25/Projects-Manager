import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { TiPencil } from 'react-icons/ti';
import { AssigneeManageButton } from './styled/AssigneeManageButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _AssigneeManageButton({ assignee }) {
    const dispatch = useDispatch();

    return (
        <AssigneeManageButton
            onClick={() => dispatch(openModal(MODALS.ASSIGNEE_MANAGE))}
        >
            {assignee ? <TiPencil /> : <FiPlus />}
        </AssigneeManageButton>
    );
}

export default _AssigneeManageButton;
