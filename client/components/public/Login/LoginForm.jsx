import React from 'react';
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
                type="password"
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
