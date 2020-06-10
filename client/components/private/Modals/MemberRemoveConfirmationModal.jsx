import React from 'react';
import ConfirmationModal from '../../global/ConfirmationModal';

import { connect } from 'react-redux';
import { removeMember } from '../../../redux/private/actions/currentProject';
import { closeModal } from '../../../redux/private/actions/activeModals';
import {
    addErrorNotification,
    addSuccessNotification,
} from '../../../redux/shared/actions/notifications';
import { CURRENT_PROJECT, MODALS } from '../../../redux/private/constants';
import NOTIFICATIONS from '../../../constants/notifications';

function MemberRemoveConfirmationModal({
    closeModal,
    removeMember,
    isLoading,
    payload,
    addErrorNotification,
    addSuccessNotification,
}) {
    const { memberId, projectId, username } = payload;

    async function handleMemberRemove() {
        const error = await removeMember(memberId, projectId);
        if (error) {
            addErrorNotification(NOTIFICATIONS.PROJECT.MEMBER_REMOVE_ERROR);
        } else {
            addSuccessNotification(NOTIFICATIONS.PROJECT.MEMBER_REMOVE_SUCCESS);
        }
        closeModal();
    }

    return (
        <ConfirmationModal
            content={`Do you really want to remove "${username}" from the project?`}
            isLoading={isLoading}
            confirmButtonText="Remove"
            onClose={closeModal}
            onConfirm={handleMemberRemove}
        />
    );
}

const ConnectedMemberRemoveConfirmationModal = connect(
    ({ requests, activeModals }) => ({
        isLoading: requests.includes(CURRENT_PROJECT.REMOVE_MEMBER),
        payload: activeModals.find(({ type }) => type === MODALS.MEMBER_REMOVE_CON)
            .payload,
    }),
    (dispatch) => ({
        closeModal: () => dispatch(closeModal(MODALS.MEMBER_REMOVE_CON)),
        removeMember: (memberId, projectId) =>
            dispatch(removeMember({ memberId, projectId })),
        addErrorNotification: (message) =>
            dispatch(addErrorNotification(message)),
        addSuccessNotification: (message) =>
            dispatch(addSuccessNotification(message)),
    })
)(MemberRemoveConfirmationModal);

export default ConnectedMemberRemoveConfirmationModal;
