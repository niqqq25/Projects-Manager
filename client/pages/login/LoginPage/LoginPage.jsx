import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import LoginForm from '../LoginForm/LoginForm';
import AlertMessage from '../../../sharedComponents/AlertMessage/AlertMessage';
import './loginPage.css';

import * as Cookie from '../../../utils/cookie';

const REGISTRATION_SUCCESS_MESSAGE = 'You have successfully registered.';
const AUTH_FAIL_MESSAGE = 'Your session has expired, please login again.';

export default function LoginPage(props) {
    const [alertMessageText, setAlertMessageText] = useState('');
    const [alertMessageFail, setAlertMessageFail] = useState(false);
    const [homeRedirect, setHomeRedirect] = useState(false);

    useEffect(() => {
        showAlertMessageBySearchParams();
    }, []);

    function showAlertMessageBySearchParams() {
        const params = new URLSearchParams(window.location.search);

        if (params.has('successfulRegistration')) {
            setAlertMessageText(REGISTRATION_SUCCESS_MESSAGE);
            setAlertMessageFail(false);
        } else if (params.has('authFail')) {
            Cookie.remove('access_token');
            setAlertMessageText(AUTH_FAIL_MESSAGE);
            setAlertMessageFail(true);
        }
    } 

    function onAlertMessageClose() {
        setAlertMessageText('');
    }

    function onLoginFormFail(message) {
        setAlertMessageText(message);
        setAlertMessageFail(true);
    }

    function onLoginFormSuccess() {
        setHomeRedirect(true);
    }

    return (
        <div id="login-page">
            {alertMessageText && (
                <AlertMessage
                    onClose={onAlertMessageClose}
                    isFail={alertMessageFail}
                >
                    {alertMessageText}
                </AlertMessage>
            )}
            <LoginForm
                onLoginFail={onLoginFormFail}
                onLoginSuccess={onLoginFormSuccess}
            />
            {homeRedirect && <Redirect to="/home" />}
        </div>
    );
}
