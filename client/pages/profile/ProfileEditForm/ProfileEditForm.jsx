import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import './profileEditForm.css';

import Form from '../../../sharedComponents/Form/Form';
import FormInput from '../../../sharedComponents/FormInput/FormInput';
import FormButton from '../../../sharedComponents/FormButton/FormButton';
import UserDeleteField from '../UserDeleteField/UserDeleteField';

import validateUserFormInput from '../../../validations/validateUserFormInput';
import * as UserAPI from '../../../requests/user';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';
import { UserContext } from '../../../providers/UserProvider';

const INVALID_FORM_MESSAGE = 'Please correctly fill fields';
const SUCCESS_CHANGES_MESSAGE = 'The changes have been saved';

export default function ProfileEditForm({ history }) {
    const { user, setUser } = useContext(UserContext);

    const [inputs, setInputs] = useState({
        firstname: {
            value: user.firstname,
            error: '',
        },
        secondname: {
            value: user.secondname,
            error: '',
        },
        company: {
            value: user.company || '-',
            error: '',
            disabled: true,
        },
        email: {
            value: user.email,
            error: '',
            disabled: true,
        },
        phone: {
            value: user.phone,
            error: '',
        },
        username: {
            value: user.username,
            error: '',
            disabled: true,
        },
    });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState(false);

    const { showAlertMessage } = useContext(AlertMessageContext);

    function handleInputChange(event) {
        const { name, value } = event.target;
        const input = inputs[name];

        input.error = validateUserFormInput({
            value,
            name,
            required: true,
        });

        input.value = value;
        setInputs({ ...inputs });
    }

    function handlePasswordChange(event) {
        const value = event.target.value;

        password.error = validateUserFormInput({
            name: 'password',
            value,
            required: false,
        });

        password.value = value;
        setPassword({ ...password });
    }

    function validateForm() {
        let valid = true;

        Object.keys(inputs).forEach(name => {
            const input = inputs[name];
            if (input.error) {
                valid = false;
            }
        });

        if (password.error) {
            valid = false;
        }

        return valid;
    }

    async function handleEditFormSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            await setLoading(true);
            const response = await editUser();
            setLoading(false);

            if (response.error) {
                onSubmitError(response.error);
            } else {
                onSubmitSuccess(response);
            }
        } else {
            onSubmitError(INVALID_FORM_MESSAGE);
        }
    }

    function onSubmitError(message) {
        showAlertMessage({ text: message, fail: true });
    }

    function onSubmitSuccess(user) {
        setUser(user);
        showAlertMessage({ text: SUCCESS_CHANGES_MESSAGE, fail: false });
    }

    async function editUser() {
        if (password.value) {
            const passwordResponse = await UserAPI.updatePassword(
                password.value
            );
            if (passwordResponse.error) {
                return passwordResponse;
            } else {
                Cookies.set('access_token', passwordResponse.token, {
                    path: '/',
                });
            }
        }

        const response = await UserAPI.update(getInputValues());

        return response;
    }

    function getInputValues() {
        return Object.keys(inputs).reduce((obj, input) => {
            obj[input] = inputs[input].value;
            return obj;
        }, {});
    }

    return (
        <Form title="Profile" style={{ margin: '50px auto' }}>
            {Object.keys(inputs).map((name, index) => {
                const input = inputs[name];
                return (
                    <FormInput
                        key={index}
                        name={name}
                        {...input}
                        onChange={handleInputChange}
                    />
                );
            })}
            <FormInput
                name="password"
                label="New password"
                error={password.error}
                onChange={handlePasswordChange}
            />
            <FormButton
                value="Save changes"
                onClick={handleEditFormSubmit}
                loading={loading}
            />
            <UserDeleteField history={history} />
        </Form>
    );
}
