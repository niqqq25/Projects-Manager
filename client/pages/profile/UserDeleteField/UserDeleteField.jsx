import React, { useContext } from 'react';
import Cookies from 'js-cookie';
import './userDeleteField.css';

import * as UserAPI from '../../../requests/user';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';
import { ConfirmationModalContext } from '../../../providers/ConfirmationModalProvider';

const USER_DELETION_FAIL_MESSAGE = 'Failed to delete account';

export default function UserDeleteField({ history }) {
    const { showAlertMessage } = useContext(AlertMessageContext);
    const {
        setConfirmationModal,
        setConfirmationModalLoading,
        removeConfirmationModal,
    } = useContext(ConfirmationModalContext);

    async function deleteUser() {
        setConfirmationModalLoading(true);
        const response = await UserAPI.remove();
        removeConfirmationModal();

        if (response.error) {
            onUserDeleteFail();
        } else {
            onUserDeleteSuccess();
        }
    }

    function onUserDeleteFail() {
        showAlertMessage({
            text: USER_DELETION_FAIL_MESSAGE,
            fail: true,
        });
    }

    function onUserDeleteSuccess() {
        Cookies.remove('access_token', { path: '/' });
        history.push({
            pathname: '/login',
            state: { userDeleted: true },
        });
    }

    return (
        <p id="delete-user-text">
            Suck at life?
            <a
                id="delete-user-link"
                onClick={() => setConfirmationModal({ onConfirm: deleteUser })}
            >
                Delete me
            </a>
        </p>
    );
}
