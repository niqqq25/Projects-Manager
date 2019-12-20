import React, { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';
import Styled from './ProfileEditForm.styles';

import Form from '../../../../sharedComponents/Form';
import InputGroup from '../../../../sharedComponents/InputGroup';
import Input from '../../../../sharedComponents/Input';
import SubmitButton from '../../../../sharedComponents/SubmitButton';
import UserDeleteField from '../UserDeleteField';

import validateUserFormInput from '../../../../validations/validateUserFormInput';
import UserAPI from '../../../../requests/user';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';
import { UserContext } from '../../../../providers/UserProvider';

const INVALID_FORM_MESSAGE = 'Please correctly fill fields';
const SUCCESS_CHANGES_MESSAGE = 'The changes have been saved';

export default function ProfileEditForm({ history }) {
    const { user, setUser } = useContext(UserContext);
    const { showAlertMessage } = useContext(AlertMessageContext);
    const [inputs, setInputs] = useState({
        firstname: {
            value: user.firstname || '',
            error: '',
            required: true,
        },
        secondname: {
            value: user.secondname || '',
            error: '',
            required: true,
        },
        company: {
            value: user.company || '-',
            error: '',
            disabled: true,
        },
        email: {
            value: user.email || '',
            error: '',
            disabled: true,
        },
        phone: {
            value: user.phone || '',
            error: '',
            required: true,
        },
        username: {
            value: user.username || '',
            error: '',
            disabled: true,
        },
        password: {
            value: '',
            error: '',
            label: 'New password',
        },
    });
    const [loading, setLoading] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

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

    function validateForm() {
        let valid = true;

        Object.keys(inputs).forEach(name => {
            const input = inputs[name];
            if (input.error) {
                valid = false;
            }
        });

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
        showAlertMessage({ text: SUCCESS_CHANGES_MESSAGE, success: true });
    }

    async function editUser() {
        if (inputs.password.value) {
            const passwordResponse = await UserAPI.updatePassword(
                inputs.password.value
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
            if (input !== 'password') {
                obj[input] = inputs[input].value;
            }
            return obj;
        }, {});
    }

    return (
        <Styled.ProfileEditForm isMobile={isMobile}>
            <Form title="Profile" disableShadow={isMobile}>
                {Object.keys(inputs).map((name, index) => {
                    const { error, disabled, value, label } = inputs[name];
                    return (
                        <Styled.ProfileEditForm__InputContainer key={index}>
                            <InputGroup
                                error={error}
                                value={value}
                                label={label || name}
                            >
                                <Input
                                    onChange={e =>
                                        handleInputChange(name, e.target.value)
                                    }
                                    value={value}
                                    password={name === 'password' ? 1 : 0}
                                    disabled={disabled}
                                />
                            </InputGroup>
                        </Styled.ProfileEditForm__InputContainer>
                    );
                })}
                <SubmitButton
                    value="Save changes"
                    onClick={handleEditFormSubmit}
                    loading={loading ? 1 : 0}
                />
                <UserDeleteField history={history} />
            </Form>
        </Styled.ProfileEditForm>
    );
}
