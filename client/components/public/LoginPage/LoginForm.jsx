import React from 'react';
import {
    Form,
    FormTitle,
    SignUpText,
    submitButton,
    signUpLink,
} from './styles/LoginForm';
import { SubmitButton, Input, Link } from '../../global';
import useForm from '../../../helpers/useForm';
import { loginFormValidationSchema } from '../../../helpers/validationSchemas';
import ROUTES from '../../../constants/routes';

//redux
import { connect } from 'react-redux';
import USER from '../../../redux/public/constants/user';
import { loginUser } from '../../../redux/public/actions/user';

function LoginForm({ history, isFetching, loginUser }) {
    const [inputs, { setValue, validateInputs }] = useForm(
        { username: '', password: '' },
        loginFormValidationSchema
    );
    const { username, password } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            loginUser(username.value, password.value);
        }
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormTitle>Login</FormTitle>

            <Input
                value={username.value}
                label="Username"
                error={username.error}
                onChange={setValue}
                name="username"
            />
            <Input
                value={password.value}
                label="Password"
                error={password.error}
                onChange={setValue}
                type="password"
                name="password"
            />

            <SubmitButton
                value="Login"
                isLoading={isFetching}
                _css={submitButton}
            />

            <SignUpText>
                Don't have an account?
                <Link
                    _css={signUpLink}
                    onClick={() => history.push(ROUTES.SIGNUP)}
                >
                    Sign up
                </Link>
            </SignUpText>
        </Form>
    );
}

const ConnectedLoginForm = connect(
    ({ requests }) => ({
        isFetching: requests.includes(USER.LOGIN_REQUEST),
    }),
    (dispatch) => ({
        loginUser: (username, password) =>
            dispatch(loginUser({ username, password })),
    })
)(LoginForm);

export default ConnectedLoginForm;
