import React from 'react';
import useForm from '../../../helpers/useForm';
import { userEditFormValidationSchema } from '../../../helpers/validationSchemas';
import { InputField, SubmitButton } from '../../global';
import { Form, ButtonContainer, FormTitle } from './styles/UserEditForm';
import UserDeleteField from './UserDeleteField';

import { connect } from 'react-redux';
import currentUserActions, {
    UPDATE_USER,
} from '../../../redux/private/actions/currentUser';

function UserEditForm({ isUpdating, currentUser, updateUser }) {
    const [inputs, { setValue, validateInputs }] = useForm(
        {
            username: currentUser.username,
            password: '',
            email: currentUser.email,
            fullName: currentUser.fullName,
        },
        userEditFormValidationSchema
    );
    const { username, password, email, fullName } = inputs;

    async function handleFormSubmit(e) {
        e.preventDefault();

        const isValid = await validateInputs();
        if (isValid) {
            updateUser(password.value, fullName.value);
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
                    loading={isUpdating ? 1 : 0}
                />
            </ButtonContainer>
            <UserDeleteField />
        </Form>
    );
}

const ConnectedUserEditForm = connect(
    ({ requesting, currentUser }) => ({
        isUpdating: requesting.includes(UPDATE_USER),
        currentUser: currentUser,
    }),
    dispatch => ({
        updateUser: (password, fullName) =>
            dispatch(currentUserActions.update({ password, fullName })),
    })
)(UserEditForm);

export default ConnectedUserEditForm;
