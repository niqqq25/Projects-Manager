import React from 'react';
import { AiOutlineCrown } from 'react-icons/ai';
import { OwnerChangeButton } from './styles/OwnerChangeButton';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../../redux/private/actions/activeModals';
import MODALS from '../../../../redux/private/constants/modals';

function _OwnerChangeButton({ projectId, memberId, username }) {
    const dispatch = useDispatch();

    return (
        <OwnerChangeButton
            onClick={() =>
                dispatch(
                    openModal({
                        type: MODALS.OWNER_CHANGE_CON,
                        payload: { projectId, memberId, username },
                    })
                )
            }
        >
            <AiOutlineCrown size={24} />
        </OwnerChangeButton>
    );
}

export default _OwnerChangeButton;
