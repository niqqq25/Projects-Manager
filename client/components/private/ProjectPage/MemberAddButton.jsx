import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { memberAddButton } from './styles/MemberAddButton';
import { GreyRoundButton } from '../../global/buttons';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _MemberAddButton() {
    const dispatch = useDispatch();

    return (
        <GreyRoundButton
            _css={memberAddButton}
            onClick={() => dispatch(openModal(MODALS.MEMBER_ADD))}
        >
            <FiPlus />
        </GreyRoundButton>
    );
}

export default _MemberAddButton;
