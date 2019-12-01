import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import './loginForm.css';

import Form from '../../../sharedComponents/Form/Form';
import FormImput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';

import * as UserAPI from '../../../requests/user';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const LOGIN_FAIL_MESSAGE =
    'The username or password you entered did not match our records. Please double-check and try again.';

export default function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { showAlertMessage } = useContext(AlertMessageContext);

    async function handleFormSubmit(event) {
        event.preventDefault();
        await setLoading(true);
        const response = await UserAPI.get({ username, password });
        setLoading(false);

        if (response.error) {
            onSubmitFail();
        } else {
            onSubmitSuccess(response);
        }
    }

    function onSubmitSuccess(response) {
        Cookies.set('access_token', response.token, { path: '/' });
        props.history.push('/home');
    }

    function onSubmitFail() {
        showAlertMessage({ text: LOGIN_FAIL_MESSAGE, fail: true });
    }

    return (
        <Form style={{ marginTop: '100px' }}>
            <FormImput
                name="username"
                onChange={event => setUsername(event.target.value)}
            />
            <FormImput
                name="password"
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
                    onClick={() => props.history.push('/registration')}
                >
                    Sign Up
                </a>
            </p>
        </Form>
    );
}
