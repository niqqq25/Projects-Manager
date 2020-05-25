import React from 'react';
import { UserDeleteField } from './styles/UserDeleteField';
import { Link } from '../../global';

import { useDispatch } from 'react-redux';
import { openConfirmation } from '../../../redux/private/actions/confirmation';
import CURRENT_USER from '../../../redux/private/constants/currentUser';

function _UserDeleteField() {
    const dispatch = useDispatch();

    return (
        <UserDeleteField>
            Suck at life?
            <Link
                onClick={() => dispatch(openConfirmation(CURRENT_USER.DELETE))}
            >
                Delete me
            </Link>
        </UserDeleteField>
    );
}

export default _UserDeleteField;
