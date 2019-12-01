import React, { useState, useContext } from 'react';
import isObject from 'isobject';
import './registrationForm.css';

import Form from '../../../sharedComponents/Form/Form';
import FormInput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';

import * as UserAPI from '../../../requests/user';
import validateUserFormInput from '../../../validations/validateUserFormInput';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

const INVALID_FORM_MESSAGE = 'Please correctly fill all required fields';

export default function RegistrationForm(props) {
    const [inputs, setInputs] = useState(inputsSchema);
    const [loading, setLoading] = useState(false);

    const { showAlertMessage } = useContext(AlertMessageContext);
    
    function handleInputChange(event) {
        const { name, value } = event.target;
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
        props.history.push({
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
            setInputs({ ...inputs });
        } else if (
            error.includes(inputs.email.value) &&
            error.includes('duplicate')
        ) {
            inputs.username.error = 'Email is already in use';
            setInputs({ ...inputs });
        }
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
        <Form title="Sign up" style={{ margin: '50px auto' }}>
            {Object.keys(inputs).map((name, index) => {
                const { error, required } = inputs[name];
                return (
                    <FormInput
                        key={index}
                        name={name}
                        required={required}
                        error={error}
                        onChange={handleInputChange}
                    />
                );
            })}
            <FormButton
                value="Signup"
                onClick={handleFormSubmit}
                loading={loading}
            />
            <p id="login-text">
                Already have an account?
                <a id="login-link" onClick={() => props.history.push('/login')}>
                    Log in
                </a>
            </p>
        </Form>
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
