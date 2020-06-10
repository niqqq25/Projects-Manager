import React from 'react';
import ConfirmationModal from '../../global/ConfirmationModal';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { updateCurrentProject } from '../../../redux/private/actions/currentProject';
import {
    addErrorNotification,
    addSuccessNotification,
} from '../../../redux/shared/actions/notifications';
import { CURRENT_PROJECT, MODALS } from '../../../redux/private/constants';
import NOTIFICATIONS from '../../../constants/notifications';

function OwnerChangeConfirmationModal({
    isLoading,
    payload,
    closeModal,
    updateOwner,
    closeMembersManageModal,
    addErrorNotification,
    addSuccessNotification,
}) {
    const { memberId, projectId, username } = payload;

    async function handleOwnerChange() {
        const error = await updateOwner(memberId, projectId);
        if (error) {
            addErrorNotification(NOTIFICATIONS.PROJECT.OWNER_CHANGE_ERROR);
        } else {
            addSuccessNotification(NOTIFICATIONS.PROJECT.OWNER_CHANGE_SUCCESS);
        }
        closeMembersManageModal();
        closeModal();
    }

    return (
        <ConfirmationModal
            isLoading={isLoading}
            content={`Do you really want to give "${username}" owner rights?`}
            onClose={closeModal}
            confirmButtonText="Give"
            onConfirm={handleOwnerChange}
        />
    );
}

const ConnectedOwnerChangeConfirmationModal = connect(
    ({ requests, activeModals }) => ({
        isLoading: requests.includes(CURRENT_PROJECT.UPDATE),
        payload: activeModals.find(({ type }) => type === MODALS.OWNER_CHANGE_CON)
            .payload,
    }),
    (dispatch) => ({
        closeModal: () => dispatch(closeModal(MODALS.OWNER_CHANGE_CON)),
        closeMembersManageModal: () =>
            dispatch(closeModal(MODALS.MEMBERS_MANAGE)),
        updateOwner: (owner, projectId) =>
            dispatch(updateCurrentProject({ owner, projectId })),
        addErrorNotification: (message) =>
            dispatch(addErrorNotification(message)),
        addSuccessNotification: (message) =>
            dispatch(addSuccessNotification(message)),
    })
)(OwnerChangeConfirmationModal);

export default ConnectedOwnerChangeConfirmationModal;
