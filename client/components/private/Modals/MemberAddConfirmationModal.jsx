import React from 'react';
import ConfirmationModal from '../../global/ConfirmationModal';

import { connect } from 'react-redux';
import { addMember } from '../../../redux/private/actions/currentProject';
import { closeModal } from '../../../redux/private/actions/activeModals';
import {
    addErrorNotification,
    addSuccessNotification,
} from '../../../redux/shared/actions/notifications';
import { CURRENT_PROJECT, MODALS } from '../../../redux/private/constants';
import NOTIFICATIONS from '../../../constants/notifications';

function MemberAddConfirmationModal({
    isLoading,
    payload,
    closeModal,
    closeAddMemberModal,
    addMember,
    addErrorNotification,
    addSuccessNotification,
}) {
    const { userId, projectId, username } = payload;

    async function handleMemberAdd() {
        const error = await addMember(userId, projectId);
        if (error) {
            addErrorNotification(NOTIFICATIONS.PROJECT.MEMBER_ADD_ERROR);
        } else {
            addSuccessNotification(NOTIFICATIONS.PROJECT.MEMBER_ADD_SUCCESS);
            closeAddMemberModal();
        }
        closeModal();
    }

    return (
        <ConfirmationModal
            content={`Do you really want to add "${username}" to the project?`}
            isLoading={isLoading}
            confirmButtonText="Add"
            onClose={closeModal}
            onConfirm={handleMemberAdd}
            success
        />
    );
}

const ConnectedMemberAddConfirmationModal = connect(
    ({ requests, activeModals }) => ({
        isLoading: requests.includes(CURRENT_PROJECT.ADD_MEMBER),
        payload: activeModals.find(({ type }) => type === MODALS.MEMBER_ADD_CON)
            .payload,
    }),
    (dispatch) => ({
        closeModal: () => dispatch(closeModal(MODALS.MEMBER_ADD_CON)),
        closeAddMemberModal: () => dispatch(closeModal(MODALS.MEMBER_ADD)),
        addMember: (userId, projectId) =>
            dispatch(addMember({ userId, projectId })),
        addErrorNotification: (message) =>
            dispatch(addErrorNotification(message)),
        addSuccessNotification: (message) =>
            dispatch(addSuccessNotification(message)),
    })
)(MemberAddConfirmationModal);

export default ConnectedMemberAddConfirmationModal;
