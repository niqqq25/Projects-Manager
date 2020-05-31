import React from 'react';
import { UserDeleteField } from './styled/UserDeleteField';
import { Link } from '../../global';

import { useDispatch } from 'react-redux';
import { openConfirmation } from '../../../redux/private/actions/confirmation';
import { deleteCurrentUser } from '../../../redux/private/actions/currentUser';
import CURRENT_USER from '../../../redux/private/constants/currentUser';

function _UserDeleteField() {
    const dispatch = useDispatch();

    return (
        <UserDeleteField>
            Suck at life?
            <Link
                onClick={() =>
                    dispatch(
                        openConfirmation({
                            type: CURRENT_USER.DELETE,
                            callback: () => dispatch(deleteCurrentUser()),
                        })
                    )
                }
            >
                Delete me
            </Link>
        </UserDeleteField>
    );
}

export default _UserDeleteField;
