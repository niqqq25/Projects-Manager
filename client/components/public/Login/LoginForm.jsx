import React, { useState, useContext } from 'react';
import {
    Form,
    FormTitle,
    SignUpText,
    ButtonContainer,
} from './styles/LoginForm';
import { SubmitButton, InputField, Link } from '../../global';
import useForm from '../../../helpers/useForm';
import { loginFormValidationSchema } from '../../../helpers/validationSchemas';
import { loginUser } from '../../../actions/user';
import { AlertMessageContext } from '../../../providers/AlertMessage';
import ALERTS from '../../../constants/alerts';
import ROUTES from '../../../constants/routes';

function LoginForm({ history }) {
    const [loading, setLoading] = useState(false);
    const [inputs, { setValue, validateInputs }] = useForm(
        { username: '', password: '' },
        loginFormValidationSchema
    );
    const { username, password } = inputs;
    const { setAlertMessage } = useContext(AlertMessageContext);

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            handleLogin();
        }
    }

    async function handleLogin() {
        setLoading(true);
        const res = await loginUser({
            username: username.value,
            password: password.value,
        });
        setLoading(false);

        if (res.status !== 'error') {
            window.location = ROUTES.HOME;
        } else {
            setAlertMessage(ALERTS.USER.LOGIN_ERROR);
        }
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormTitle>Login</FormTitle>

            <InputField
                value={username.value}
                label="Username"
                error={username.error}
                onChange={setValue}
                name="username"
            />
            <InputField
                value={password.value}
                label="Password"
                error={password.error}
                onChange={setValue}
                name="password"
            />

            <ButtonContainer>
                <SubmitButton value="Login" loading={loading ? 1 : 0} />
            </ButtonContainer>

            <SignUpText>
                Don't have an account?
                <Link onClick={() => history.push(ROUTES.SIGNUP)}>Sign up</Link>
            </SignUpText>
        </Form>
    );
}

export default LoginForm;
