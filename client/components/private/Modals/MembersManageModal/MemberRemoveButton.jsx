import React from 'react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { MemberRemoveButton } from './styles/MemberRemoveButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../../redux/private/actions/activeModals';
import MODALS from '../../../../redux/private/constants/modals';

function _MemberRemoveButton({ projectId, memberId, username }) {
    const dispatch = useDispatch();

    return (
        <MemberRemoveButton
            onClick={() =>
                dispatch(
                    openModal({
                        type: MODALS.MEMBER_REMOVE_CON,
                        payload: { projectId, memberId, username },
                    })
                )
            }
        >
            <IoIosRemoveCircleOutline size={24} />
        </MemberRemoveButton>
    );
}

export default _MemberRemoveButton;
