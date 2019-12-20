import React, { useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import Styled from './RegistrationForm.styles';

import Form from '../../../../sharedComponents/Form';
import Input from '../../../../sharedComponents/Input';
import InputGroup from '../../../../sharedComponents/InputGroup';
import SubmitButton from '../../../../sharedComponents/SubmitButton';

import UserAPI from '../../../../requests/user';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';
import validateUserFormInput from '../../../../validations/validateUserFormInput';

const INVALID_FORM_MESSAGE = 'Please correctly fill all required fields';

export default function RegistrationForm({ history }) {
    const [inputs, setInputs] = useState(inputsSchema);
    const [loading, setLoading] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const { showAlertMessage } = useContext(AlertMessageContext);

    function handleInputChange(name, value) {
        const input = inputs[name];

        input.error = validateUserFormInput({
            value,
            name,
            required: input.required,
        });

        input.value = value;
        setInputs({ ...inputs });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            await setLoading(true);
            const response = await UserAPI.create(getInputValues());
            setLoading(false);

            if (response.error) {
                onSubmitFail(response.error);
            } else {
                onSubmitSuccess();
            }
        } else {
            onSubmitFail();
        }
    }

    function getInputValues() {
        return Object.keys(inputs).reduce((obj, input) => {
            obj[input] = inputs[input].value;
            return obj;
        }, {});
    }

    function onSubmitSuccess() {
        history.push({
            pathname: '/login',
            state: { registrationSuccess: true },
        });
    }

    function onSubmitFail(errorMessage) {
        showAlertMessage({ text: INVALID_FORM_MESSAGE, fail: true });
        const error = errorMessage || '';

        if (
            error.includes(inputs.username.value) &&
            error.includes('duplicate')
        ) {
            inputs.username.error = 'Username is already in use';
        } else if (
            error.includes(inputs.email.value) &&
            error.includes('duplicate')
        ) {
            inputs.username.error = 'Email is already in use';
        }
        setInputs({ ...inputs });
    }

    function validateForm() {
        let valid = true;

        Object.keys(inputs).forEach(name => {
            const input = inputs[name];
            if ((input.required && !input.value) || input.error) {
                valid = false;
            }
        });

        return valid;
    }

    return (
        <Styled.RegistrationForm isMobile={isMobile}>
            <Form title="Sign up" disableShadow={isMobile}>
                {Object.keys(inputs).map((name, index) => {
                    const { error, required, value } = inputs[name];
                    return (
                        <Styled.RegistrationForm__InputContainer key={index}>
                            <InputGroup
                                error={error}
                                value={value}
                                required={required}
                                label={name}
                            >
                                <Input
                                    onChange={e =>
                                        handleInputChange(name, e.target.value)
                                    }
                                    value={value}
                                    password={name === 'password' ? 1 : 0}
                                />
                            </InputGroup>
                        </Styled.RegistrationForm__InputContainer>
                    );
                })}
                <Styled.RegistrationForm__ButtonContainer>
                    <SubmitButton
                        value="Signup"
                        loading={loading ? 1 : 0}
                        onClick={handleFormSubmit}
                    />
                </Styled.RegistrationForm__ButtonContainer>
                <Styled.RegistrationForm__LoginText>
                    Already have an account?
                    <Styled.LoginText__Link
                        onClick={() => history.push('/login')}
                    >
                        Login
                    </Styled.LoginText__Link>
                </Styled.RegistrationForm__LoginText>
            </Form>
        </Styled.RegistrationForm>
    );
}

const inputsSchema = {
    firstname: {
        value: '',
        error: '',
        required: true,
    },
    secondname: {
        value: '',
        error: '',
        required: true,
    },
    company: {
        value: '',
        error: '',
    },
    email: {
        value: '',
        error: '',
        required: true,
    },
    phone: {
        value: '',
        error: '',
        required: true,
    },
    username: {
        value: '',
        error: '',
        required: true,
    },
    password: {
        value: '',
        error: '',
        required: true,
    },
};
