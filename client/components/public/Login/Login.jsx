import React, { useContext, useEffect } from 'react';

import LoginForm from './LoginForm';
import { AlertMessageContext } from '../../../providers/AlertMessage';
import ALERTS from '../../../constants/alerts';

function Login({ history }) {
    const { setAlertMessage } = useContext(AlertMessageContext);

    useEffect(() => {
        handleAlerts();
    }, []);

    function handleAlerts() {
        const searchParams = new URLSearchParams(window.location.search);
        const isRegistrationSuccess = searchParams.has('registrationSuccess');
        const isUserDelete = searchParams.has('userDelete');
        let message = null;

        if (isRegistrationSuccess) {
            message = ALERTS.USER.REGISTRATION_SUCCESS;
        } else if (isUserDelete) {
            message = ALERTS.USER.DELETION_SUCCESS;
        }
        setAlertMessage(message);
    }

    return <LoginForm history={history} />;
}

export default Login;
