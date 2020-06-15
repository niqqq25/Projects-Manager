import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { TiPencil } from 'react-icons/ti';
import { GreyRoundButton } from '../../global/buttons';
import { assigneeManageButton } from './styles/AssigneeManageButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _AssigneeManageButton({ assignee }) {
    const dispatch = useDispatch();

    return (
        <GreyRoundButton
            _css={assigneeManageButton}
            onClick={() => dispatch(openModal(MODALS.ASSIGNEE_MANAGE))}
        >
            {assignee ? <TiPencil /> : <FiPlus />}
        </GreyRoundButton>
    );
}

export default _AssigneeManageButton;
