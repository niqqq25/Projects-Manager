import React, { useState } from 'react';
import {
    Form,
    FormTitle,
    SignUpText,
    ButtonContainer,
} from './styles/LoginForm';
import { SubmitButton, InputField, Link } from '../../global';
import useForm from '../../../helpers/useForm';
import { loginFormValidationSchema } from '../../../helpers/validationSchemas';
import ROUTES from '../../../constants/routes';
import userActions from '../../../redux/public/actions/user';

import { useSelector, useDispatch } from 'react-redux';

function LoginForm({ history }) {
    const [inputs, { setValue, validateInputs }] = useForm(
        { username: '', password: '' },
        loginFormValidationSchema
    );
    const { username, password } = inputs;

    const { isFetching } = useSelector(state => state.login);
    const dispatch = useDispatch();

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            dispatch(
                userActions.login({
                    username: username.value,
                    password: password.value,
                })
            );
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
                <SubmitButton value="Login" loading={isFetching ? 1 : 0} />
            </ButtonContainer>

            <SignUpText>
                Don't have an account?
                <Link onClick={() => history.push(ROUTES.SIGNUP)}>Sign up</Link>
            </SignUpText>
        </Form>
    );
}

export default LoginForm;
