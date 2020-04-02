import React from 'react';
import { UserDeleteField } from './styles/UserDeleteField';
import { Link } from '../../global';

import { useDispatch } from 'react-redux';
import confirmationActions from '../../../redux/private/actions/confirmation';
import { DELETE_USER } from '../../../redux/private/actions/currentUser';

function _UserDeleteField() {
    const dispatch = useDispatch();

    return (
        <UserDeleteField>
            Suck at life?
            <Link
                onClick={() => dispatch(confirmationActions.open(DELETE_USER))}
            >
                Delete me
            </Link>
        </UserDeleteField>
    );
}

export default _UserDeleteField;
