import React, { useState, useEffect, useContext } from 'react';
import './addUserModal.css';

import Modal from '../../../sharedComponents/Modal/Modal';
import Select from '../../../sharedComponents/Select/Select';
import FormButton from '../../../sharedComponents/FormButton/FormButton';

import * as UserAPI from '../../../requests/user';
import * as ProjectAPI from '../../../requests/project';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';

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
        showAlertMessage({ text: ADD_USER_SUCCESS_MESSAGE, fail: false });
        onSuccess();
    }

    function onAddUserFail() {
        showAlertMessage({ text: ADD_USER_FAIL_MESSAGE, fail: true });
    }

    return (
        <Modal onClose={onClose} closingEnabled={!loading}>
            <form id="add-user-form">
                <Select
                    onChange={handleUserSelect}
                    title="SELECT USER"
                    disabled={loading}
                >
                    <option></option>
                    {(users || []).map((user, index) => (
                        <option key={index} value={user._id}>
                            {user.username}
                        </option>
                    ))}
                </Select>
                <FormButton
                    value="add user"
                    onClick={addUser}
                    loading={loading}
                    disabled={!selectedUser}
                />
            </form>
        </Modal>
    );
}
