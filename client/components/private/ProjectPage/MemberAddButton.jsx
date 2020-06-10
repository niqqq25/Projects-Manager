import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { MemberAddButton } from './styled/MemberAddButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _MemberAddButton() {
    const dispatch = useDispatch();

    return (
        <MemberAddButton onClick={() => dispatch(openModal(MODALS.MEMBER_ADD))}>
            <FiPlus />
        </MemberAddButton>
    );
}

export default _MemberAddButton;
