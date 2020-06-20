import React from 'react';
import {
    Member,
    MemberInfo,
    MemberUsername,
    MemberFullName,
} from './styles/Member';
import Avatar from '../../../global/Avatar';

import { connect } from 'react-redux';
import { updateCurrentTask } from '../../../../redux/private/actions/currentTask';
import { closeModal } from '../../../../redux/private/actions/activeModals';
import MODALS from '../../../../redux/private/constants/modals';

function _Member({ member, taskId, closeModal, updateAssignee }) {
    const { username, _id, fullName, avatarUrl } = member;

    async function handleAssigneeChange() {
        await updateAssignee(taskId, _id);
        closeModal();
    }

    return (
        <Member onClick={handleAssigneeChange}>
            <Avatar size={34} src={avatarUrl} />
            <MemberInfo>
                <MemberUsername>{username}</MemberUsername>
                {fullName && <MemberFullName>{fullName}</MemberFullName>}
            </MemberInfo>
        </Member>
    );
}

const ConnectedMember = connect(
    ({ currentTask }) => ({
        taskId: currentTask.task._id,
    }),
    (dispatch) => ({
        closeModal: () => dispatch(closeModal(MODALS.ASSIGNEE_MANAGE)),
        updateAssignee: (taskId, assigneeId) =>
            dispatch(
                updateCurrentTask({ taskId, updates: { assignee: assigneeId } })
            ),
    })
)(_Member);

export default ConnectedMember;
