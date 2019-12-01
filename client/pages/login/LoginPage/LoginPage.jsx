import React, { useEffect, useContext } from 'react';

import LoginForm from '../LoginForm/LoginForm';

import { AlertMessageContext } from '../../../providers/AlertMessageProvider';
import { ConfirmationModalContext } from '../../../providers/ConfirmationModalProvider';

const REGISTRATION_SUCCESS_MESSAGE = 'You have successfully registered.';
const USER_DELETION_SUCCESS_MESSAGE = 'User has been successfully deleted.';
const AUTH_FAIL_MESSAGE = 'Your session has expired, please login again.';

export default function LoginPage(props) {
    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );
    const { removeConfirmationModal } = useContext(ConfirmationModalContext);

    useEffect(() => {
        removeAlertMessage();
        removeConfirmationModal();
        handleOtherPagesAlert();
    }, []);

    function handleOtherPagesAlert() {
        const state = props.location.state || {};
        const message = {};

        if (state.authFailed) {
            message.text = AUTH_FAIL_MESSAGE;
            message.fail = true;
        } else if (state.registrationSuccess) {
            message.text = REGISTRATION_SUCCESS_MESSAGE;
            message.fail = false;
        } else if (state.userDeleted) {
            message.text = USER_DELETION_SUCCESS_MESSAGE;
            message.fail = false;
        }

        props.history.replace();
        showAlertMessage(message);
    }

    return (
        <div id="login-page">
            <LoginForm {...props} />
        </div>
    );
}
