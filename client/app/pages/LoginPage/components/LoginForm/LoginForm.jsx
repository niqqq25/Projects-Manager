import React, { useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import Cookies from 'js-cookie';
import Styled from './LoginForm.styles';

import Form from '../../../../sharedComponents/Form';
import Input from '../../../../sharedComponents/Input';
import InputGroup from '../../../../sharedComponents/InputGroup';
import SubmitButton from '../../../../sharedComponents/SubmitButton';

import UserAPI from '../../../../requests/user';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';

const LOGIN_FAIL_MESSAGE =
    'The username or password you entered did not match our records. Please double-check and try again.';

const InputField = ({ value, label, onChange, password }) => (
    <Styled.LoginForm__InputContainer>
        <InputGroup value={value} label={label}>
            <Input
                onChange={e => onChange(e.target.value)}
                value={value}
                password={password}
            />
        </InputGroup>
    </Styled.LoginForm__InputContainer>
);

export default function LoginForm({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
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
        history.push('/home');
    }

    function onSubmitFail() {
        showAlertMessage({ text: LOGIN_FAIL_MESSAGE, fail: true });
    }

    return (
        <Styled.LoginForm isMobile={isMobile}>
            <Form disableShadow={isMobile}>
                <InputField
                    value={username}
                    label="Username"
                    onChange={setUsername}
                />
                <InputField
                    value={password}
                    label="Password"
                    onChange={setPassword}
                    password
                />
                <Styled.LoginForm_ButtonContainer>
                    <SubmitButton
                        value="Login"
                        loading={loading ? 1 : 0}
                        onClick={handleFormSubmit}
                    />
                </Styled.LoginForm_ButtonContainer>
                <Styled.LoginForm__SignUpText>
                    Don't have an account?
                    <Styled.SignUpText__Link
                        onClick={() => history.push('/registration')}
                    >
                        Sign up
                    </Styled.SignUpText__Link>
                </Styled.LoginForm__SignUpText>
            </Form>
        </Styled.LoginForm>
    );
}
