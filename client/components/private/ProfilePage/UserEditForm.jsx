import React from 'react';
import useForm from '../../../helpers/useForm';
import { userEditFormValidationSchema } from '../../../helpers/validationSchemas';
import { Input, SubmitButton } from '../../global';
import { Form, ButtonWrapper } from './styled/UserEditForm';
import UserDeleteField from './UserDeleteField';

import { connect } from 'react-redux';
import { updateCurrentUser } from '../../../redux/private/actions/currentUser';
import CURRENT_USER from '../../../redux/private/constants/currentUser';

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
            <Input
                value={fullName.value}
                label="Full Name"
                error={fullName.error}
                onChange={setValue}
                name="fullName"
            />
            <Input value={email.value} label="Email" type="email" disabled />
            <Input value={username.value} label="Username" disabled />
            <Input
                value={password.value}
                label="New Password"
                error={password.error}
                onChange={setValue}
                name="password"
                type="password"
            />

            <ButtonWrapper>
                <SubmitButton
                    value="Update profile"
                    loading={isUpdating ? 1 : 0}
                />
            </ButtonWrapper>
            <UserDeleteField />
        </Form>
    );
}

const ConnectedUserEditForm = connect(
    ({ requests, currentUser }) => ({
        isUpdating: requests.includes(CURRENT_USER.UPDATE),
        currentUser,
    }),
    (dispatch) => ({
        updateUser: (password, fullName) =>
            dispatch(updateCurrentUser({ password, fullName })),
    })
)(UserEditForm);

export default ConnectedUserEditForm;
