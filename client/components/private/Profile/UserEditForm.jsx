import React, { useState, useContext } from 'react';
import { UserContext } from '../../../providers/User';
import { AlertMessageContext } from '../../../providers/AlertMessage';
import useForm from '../../../helpers/useForm';
import { userEditFormValidationSchema } from '../../../helpers/validationSchemas';
import { InputField, SubmitButton, Link } from '../../global';
import { Form, ButtonContainer, FormTitle } from './styles/UserEditForm';
import UserDeleteField from './UserDeleteField';
import ALERTS from '../../../constants/alerts';

function UserEditForm() {
    const [loading, setLoading] = useState(false);
    const { user, updateUser } = useContext(UserContext);
    const { setAlertMessage } = useContext(AlertMessageContext);
    const [inputs, { setValue, validateInputs }] = useForm(
        {
            username: user.username,
            password: '',
            email: user.email,
            fullName: user.fullName,
        },
        userEditFormValidationSchema
    );
    const { username, password, email, fullName } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            handleUpdateUser();
        }
    }

    async function handleUpdateUser() {
        setLoading(true);
        const res = await updateUser({
            fullName: fullName.value,
            password: password.value || undefined,
        });
        setLoading(false);

        if (res.user) {
            setAlertMessage(ALERTS.USER.UPDATE_SUCCESS);
        }
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormTitle>Profile</FormTitle>

            <InputField
                value={fullName.value}
                label="Full Name"
                error={fullName.error}
                onChange={setValue}
                name="fullName"
            />
            <InputField
                value={email.value}
                label="Email"
                type="email"
                disabled
            />
            <InputField value={username.value} label="Username" disabled />
            <InputField
                value={password.value}
                label="New Password"
                error={password.error}
                onChange={setValue}
                name="password"
                type="password"
            />

            <ButtonContainer>
                <SubmitButton
                    value="Update profile"
                    loading={loading ? 1 : 0}
                />
            </ButtonContainer>
            <UserDeleteField />
        </Form>
    );
}

export default UserEditForm;