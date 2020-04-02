import React, { useEffect } from 'react';
import { InputField, SubmitButton, Link } from '../../global';
import {
    Form,
    LoginText,
    ButtonContainer,
    FormTitle,
} from './styles/SignupForm';
import useForm from '../../../helpers/useForm';
import { signupFormValidationSchema } from '../../../helpers/validationSchemas';
import ROUTES from '../../../constants/routes';

import { connect } from 'react-redux';
import userActions from '../../../redux/public/actions/user';

const initialInputs = {
    fullName: '',
    email: '',
    username: '',
    password: '',
};

function SignupForm({
    history,
    registration,
    clearRegistrationError,
    registerUser,
}) {
    const [inputs, { setValue, validateInputs, setError }] = useForm(
        initialInputs,
        signupFormValidationSchema
    );
    const { fullName, email, username, password } = inputs;
    const { isFetching, error } = registration;

    useEffect(() => {
        if (error) {
            onCreateUserError(error.message);
            clearRegistrationError();
        }
    }, [error]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            registerUser(
                username.value,
                password.value,
                email.value,
                fullName.value,
                history
            );
        }
    }

    function onCreateUserError(message) {
        const isDuplicate = message.includes('duplicate');
        const isUsername = message.includes('username');
        const isEmail = message.includes('email');

        if (isDuplicate && isUsername) {
            setError({ name: 'username', value: 'Username is already in use' });
        } else if (isDuplicate && isEmail) {
            setError({ name: 'email', value: 'Email is already in use' });
        }
    }

    return (
        <Form onSubmit={handleFormSubmit} noValidate>
            <FormTitle>Sign Up</FormTitle>

            <InputField
                value={fullName.value}
                label="Full Name"
                error={fullName.error}
                onChange={setValue}
                name="fullName"
                required
            />
            <InputField
                value={email.value}
                label="Email"
                error={email.error}
                onChange={setValue}
                name="email"
                type="email"
                required
            />
            <InputField
                value={username.value}
                label="Username"
                error={username.error}
                onChange={setValue}
                name="username"
                required
            />
            <InputField
                value={password.value}
                label="Password"
                error={password.error}
                onChange={setValue}
                name="password"
                type="password"
                required
            />

            <ButtonContainer>
                <SubmitButton value="Sign Up" loading={isFetching ? 1 : 0} />
            </ButtonContainer>

            <LoginText>
                Already have an account?
                <Link onClick={() => history.push(ROUTES.LOGIN)}>Login</Link>
            </LoginText>
        </Form>
    );
}

const ConnectedSignupForm = connect(
    ({ registration }) => ({ registration }),
    dispatch => ({
        clearRegistrationError: () =>
            dispatch(userActions.clearRegistrationError()),
        registerUser: (username, password, email, fullName, history) =>
            dispatch(
                userActions.register({
                    username,
                    password,
                    email,
                    fullName,
                    history,
                })
            ),
    })
)(SignupForm);

export default ConnectedSignupForm;
