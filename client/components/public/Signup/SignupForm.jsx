import React, { useState } from 'react';
import { InputField, SubmitButton, Link } from '../../global';
import {
    Form,
    LoginText,
    ButtonContainer,
    FormTitle,
} from './styles/SignupForm';
import useForm from '../../../helpers/useForm';
import { signupFormValidationSchema } from '../../../helpers/validationSchemas';
import { createUser } from '../../../actions/user';

const initialInputs = {
    fullName: '',
    email: '',
    username: '',
    password: '',
};

function SignupForm({ history }) {
    const [loading, setLoading] = useState(false);
    const [inputs, { setValue, validateInputs, setError }] = useForm(
        initialInputs,
        signupFormValidationSchema
    );
    const { fullName, email, username, password } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            handleCreateUser();
        }
    }

    async function handleCreateUser() {
        setLoading(true);
        const res = await createUser({
            username: username.value,
            password: password.value,
            fullName: fullName.value,
            email: email.value,
        });
        setLoading(false);

        if (res.status === 'error') {
            onCreateUserError(res.message);
        } else {
            history.push('/login?registrationSuccess=true');
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
                <SubmitButton value="Sign Up" loading={loading ? 1 : 0} />
            </ButtonContainer>

            <LoginText>
                Already have an account?
                <Link onClick={() => history.push('/login')}>Login</Link>
            </LoginText>
        </Form>
    );
}

export default SignupForm;
