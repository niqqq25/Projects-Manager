import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MemberAddButton } from './styled/MemberAddButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../../redux/private/actions/activeModals';
import MODALS from '../../../../redux/private/constants/modals';

function _MemberAddButton({ projectId, userId, username }) {
    const dispatch = useDispatch();

    return (
        <MemberAddButton
            onClick={() =>
                dispatch(
                    openModal({
                        type: MODALS.MEMBER_ADD_CON,
                        payload: { projectId, userId, username },
                    })
                )
            }
        >
            <IoIosAddCircleOutline size={24} />
        </MemberAddButton>
    );
}

export default _MemberAddButton;
