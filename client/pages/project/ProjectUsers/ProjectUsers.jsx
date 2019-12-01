import React, { useState, useContext } from 'react';
import './projectUsers.css';

import Button from '../../../sharedComponents/Button/Button';
import AddUserModal from '../AddUserModal/AddUserModal';

import { UserContext } from '../../../providers/UserProvider';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';
import { ConfirmationModalContext } from '../../../providers/ConfirmationModalProvider';
import * as ProjectAPI from '../../../requests/project';

export default function ProjectUsers({ project = {}, onRefetch, history }) {
    const [addUserModal, setAddUserModal] = useState(false);
    const { user } = useContext(UserContext);
    const isOwner = user._id === project.owner._id;

    function onAddUserSuccess() {
        setAddUserModal(false);
        onRefetch();
    }

    return (
        <div id="project-users">
            <div id="project-users-header">
                <h2 id="project-users-title">Users</h2>
                {isOwner && (
                    <Button
                        value="Add +"
                        onClick={() => setAddUserModal(true)}
                    />
                )}
            </div>
            <ul className="users-list">
                {project.members.map((member, index) => (
                    <ProjectUser
                        history={history}
                        onRefetch={onRefetch}
                        member={member}
                        project={project}
                        key={index}
                    />
                ))}
            </ul>
            {addUserModal && (
                <AddUserModal
                    onClose={() => setAddUserModal(false)}
                    projectId={project._id}
                    onSuccess={onAddUserSuccess}
                />
            )}
        </div>
    );
}

const REMOVE_USER_SUCCESS_MESSAGE = 'User is removed successfully.';
const REMOVE_USER_FAIL_MESSAGE = 'Failed to removed user.';
const LEAVE_FAIL_MESSAGE = 'Failed to leave the project.';

function ProjectUser({ member, project, onRefetch, history }) {
    const { user } = useContext(UserContext);
    const {
        setConfirmationModal,
        setConfirmationModalLoading,
        removeConfirmationModal,
    } = useContext(ConfirmationModalContext);
    const { showAlertMessage } = useContext(AlertMessageContext);

    const isMe = member._id === user._id;
    const isOwner = project.owner._id === user._id;

    async function removeUserFromProject() {
        setConfirmationModalLoading(true);
        const response = await ProjectAPI.removeMember({
            projectId: project._id,
            userId: member._id,
        });
        removeConfirmationModal();

        if (response.error) {
            onRemoveUserFail();
        } else {
            onRemoveUserSuccess();
        }
    }

    function onRemoveUserSuccess() {
        if (isMe) {
            history.push({ pathname: '/home', state: { projectLeft: true } });
        } else {
            showAlertMessage({
                text: REMOVE_USER_SUCCESS_MESSAGE,
                fail: false,
            });
            onRefetch();
        }
    }

    function onRemoveUserFail() {
        if (isMe) {
            showAlertMessage({ text: LEAVE_FAIL_MESSAGE, fail: true });
        }
        showAlertMessage({ text: REMOVE_USER_FAIL_MESSAGE, fail: true });
    }

    function handleRemoveUserClick() {
        setConfirmationModal({
            onConfirm: removeUserFromProject,
        });
    }

    function showUserRemoveLink() {
        if (isOwner && isMe) {
            return false;
        } else if (!isOwner && !isMe) {
            return false;
        }
        return true;
    }

    function getUserType() {
        if (isMe) {
            return '(You)';
        }
        if (member._id === project.owner._id) {
            return '(Owner)';
        }
        return '';
    }

    return (
        <li className="user-field">
            {`${member.username} ${getUserType()}`}
            {showUserRemoveLink() && (
                <a
                    className="remove-user-button"
                    name={member._id}
                    onClick={handleRemoveUserClick}
                >
                    x
                </a>
            )}
        </li>
    );
}
