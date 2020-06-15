import React from 'react';
import { UserDeleteField, userDeleteLink } from './styles/UserDeleteField';
import { Link } from '../../global';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _UserDeleteField() {
    const dispatch = useDispatch();

    return (
        <UserDeleteField>
            Suck at life?
            <Link
                _css={userDeleteLink}
                onClick={() => dispatch(openModal(MODALS.USER_DELETE_CON))}
            >
                Delete me
            </Link>
        </UserDeleteField>
    );
}

export default _UserDeleteField;
