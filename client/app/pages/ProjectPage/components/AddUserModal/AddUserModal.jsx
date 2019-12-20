import React, { useState, useEffect, useContext } from 'react';
import Styled from './AddUserModal.styles';

import Modal from '../../../../sharedComponents/Modal';
import InputGroup from '../../../../sharedComponents/InputGroup';
import Select from '../../../../sharedComponents/Select';
import SubmitButton from '../../../../sharedComponents/SubmitButton';

import UserAPI from '../../../../requests/user';
import ProjectAPI from '../../../../requests/project';
import { AlertMessageContext } from './../../../../providers/AlertMessageProvider';

const USERS_FETCH_FAIL_MESSAGE = 'Failed to load users.';
const ADD_USER_FAIL_MESSAGE = 'Failed to add user.';
const ADD_USER_SUCCESS_MESSAGE = 'User added successfully.';

export default function AddUserModal({ onClose, projectId, onSuccess }) {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { showAlertMessage, removeAlertMessage } = useContext(
        AlertMessageContext
    );

    useEffect(() => {
        removeAlertMessage();
        getUsers();
        return removeAlertMessage;
    }, []);

    async function getUsers() {
        setLoading(true);
        const response = await UserAPI.getAll({ projectId });
        setLoading(false);

        if (response.error) {
            showAlertMessage({ text: USERS_FETCH_FAIL_MESSAGE, fail: true });
        } else {
            setUsers(response);
        }
    }

    function handleUserSelect(event) {
        setSelectedUser(event.target.value);
    }

    async function addUser() {
        setLoading(true);
        const response = await ProjectAPI.addMember({
            projectId,
            userId: selectedUser,
        });
        setLoading(false);

        if (response.error) {
            onAddUserFail();
        } else {
            onAddUserSuccess();
        }
    }

    function onAddUserSuccess() {
        showAlertMessage({ text: ADD_USER_SUCCESS_MESSAGE, success: true });
        onSuccess();
    }

    function onAddUserFail() {
        showAlertMessage({ text: ADD_USER_FAIL_MESSAGE, fail: true });
    }

    return (
        <Styled.AddUserModal>
            <Modal onClose={onClose} closingEnabled={!loading}>
                <Styled.AddUserModal__Form>
                    <Styled.AddUserModal__Form__SelectContainer>
                        <InputGroup value="1" label="SELECT USER">
                            <Select
                                onChange={handleUserSelect}
                                disabled={loading}
                            >
                                <option></option>
                                {(users || []).map((user, index) => (
                                    <option key={index} value={user._id}>
                                        {user.username}
                                    </option>
                                ))}
                            </Select>
                        </InputGroup>
                    </Styled.AddUserModal__Form__SelectContainer>
                    <SubmitButton
                        value="add user"
                        onClick={addUser}
                        loading={loading ? 1 : 0}
                        disabled={!selectedUser}
                    />
                </Styled.AddUserModal__Form>
            </Modal>
        </Styled.AddUserModal>
    );
}
