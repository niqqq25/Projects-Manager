import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './loginForm.css';

import FormImput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';

import * as UserAPI from '../../../requests/user';
import * as Cookie from '../../../utils/cookie';

const LOGIN_FAIL_MESSAGE =
    'The username or password you entered did not match our records. Please double-check and try again.';

export default function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [registrationRedirect, setRegistrationRedirect] = useState(false);

    async function handleFormSubmit(event) {
        event.preventDefault();
        await setLoading(true);
        const response = await UserAPI.get({username, password});
        setLoading(false);

        if(response.error){
            props.onLoginFail(LOGIN_FAIL_MESSAGE);
        } else {
            Cookie.set({name: 'access_token', value: response.token});
            props.onLoginSuccess();
        }
    }

    return (
        <form id="login-form">
            <FormImput
                label="Username"
                onChange={event => setUsername(event.target.value)}
            />
            <FormImput
                label="Password"
                type="password"
                onChange={event => setPassword(event.target.value)}
            />
            <FormButton
                value="login"
                onClick={handleFormSubmit}
                loading={loading}
            />
            <p id="signup-text">
                Don't have an account?
                <a
                    id="signup-link"
                    onClick={() => setRegistrationRedirect(true)}
                >
                    Sign Up
                </a>
                {registrationRedirect && <Redirect to="/registration" />}
            </p>
        </form>
    );
}
