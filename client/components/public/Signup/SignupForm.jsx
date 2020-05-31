import React from 'react';
import { InputField, SubmitButton, Link } from '../../global';
import {
    Form,
    LoginText,
    ButtonWrapper,
    FormTitle,
} from './styled/SignupForm';
import useForm from '../../../helpers/useForm';
import { signupFormValidationSchema } from '../../../helpers/validationSchemas';
import ROUTES from '../../../constants/routes';

//redux
import { connect } from 'react-redux';
import USER from '../../../redux/public/constants/user';
import { registerUser } from '../../../redux/public/actions/user';

const initialInputs = {
    fullName: '',
    email: '',
    username: '',
    password: '',
};

function SignupForm({ history, isFetching, registerUser }) {
    const [inputs, { setValue, validateInputs, setError }] = useForm(
        initialInputs,
        signupFormValidationSchema
    );
    const { fullName, email, username, password } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            const error = await registerUser(
                username.value,
                password.value,
                email.value,
                fullName.value
            );

            if (error) {
                handleRegistrationError(error);
            } else {
                history.push(ROUTES.LOGIN);
            }
        }
    }

    function handleRegistrationError(error) {
        const isDuplicate = error.includes('duplicate');
        const isUsername = error.includes('username');
        const isEmail = error.includes('email');

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

            <ButtonWrapper>
                <SubmitButton value="Sign Up" loading={isFetching ? 1 : 0} />
            </ButtonWrapper>

            <LoginText>
                Already have an account?
                <Link onClick={() => history.push(ROUTES.LOGIN)}>Login</Link>
            </LoginText>
        </Form>
    );
}

const ConnectedSignupForm = connect(
    ({ requests }) => ({
        isFetching: requests.includes(USER.REGISTRATION_REQUEST),
    }),
    (dispatch) => ({
        registerUser: (username, password, email, fullName) =>
            dispatch(
                registerUser({
                    username,
                    password,
                    email,
                    fullName,
                })
            ),
    })
)(SignupForm);

export default ConnectedSignupForm;
