import React, { useContext } from 'react';
import Styled from './ProjectUser.styles';

import { UserContext } from '../../../../providers/UserProvider';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';
import { ConfirmationModalContext } from '../../../../providers/ConfirmationModalProvider';

import ProjectAPI from '../../../../requests/project';

const REMOVE_USER_SUCCESS_MESSAGE = 'User is removed successfully.';
const REMOVE_USER_FAIL_MESSAGE = 'Failed to removed user.';
const LEAVE_FAIL_MESSAGE = 'Failed to leave the project.';

export default function ProjectUser({ member, project, onRefetch, history }) {
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
                success: true,
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
        <Styled.ProjectUser>
            {`${member.username} ${getUserType()}`}
            {showUserRemoveLink() && (
                <Styled.ProjectUser__CloseLink
                    name={member._id}
                    onClick={handleRemoveUserClick}
                >
                    x
                </Styled.ProjectUser__CloseLink>
            )}
        </Styled.ProjectUser>
    );
}
