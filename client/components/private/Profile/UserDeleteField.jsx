import React, { useContext } from 'react';
import { UserDeleteField } from './styles/UserDeleteField';
import { AlertMessageContext } from '../../../providers/AlertMessage';
import { ConfirmationModalContext } from '../../../providers/ConfirmationModal';
import { Link } from '../../global';

function _UserDeleteField() {
    const { setAlertMessage } = useContext(AlertMessageContext);
    const {
        setConfirmationModal,
        setConfirmationModalLoading,
        removeConfirmationModal,
    } = useContext(ConfirmationModalContext);

    async function deleteUser() {
        setConfirmationModalLoading(true);
        const res = await UserAPI.remove();
        removeConfirmationModal();

        if (res.status === 'error') {
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
        <UserDeleteField>
            Suck at life?
            <Link
                onClick={() => setConfirmationModal({ onConfirm: deleteUser })}
            >
                Delete me
            </Link>
        </UserDeleteField>
    );
}

export default _UserDeleteField;
