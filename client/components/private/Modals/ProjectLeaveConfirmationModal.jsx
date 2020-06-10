import React from 'react';
import { withRouter } from 'react-router-dom';
import ConfirmationModal from '../../global/ConfirmationModal';

import { connect } from 'react-redux';
import { removeMember } from '../../../redux/private/actions/currentProject';
import { closeModal } from '../../../redux/private/actions/activeModals';
import {
    addErrorNotification,
    addSuccessNotification,
} from '../../../redux/shared/actions/notifications';
import { CURRENT_PROJECT, MODALS } from '../../../redux/private/constants';

import ROUTES from '../../../constants/routes';
import NOTIFICATIONS from '../../../constants/notifications';
const PROJECT_LEAVE_CONTENT = 'Do you really want to leave this project?';

function ProjectLeaveConfirmationModal({
    closeModal,
    isLoading,
    removeMember,
    projectId,
    memberId,
    history,
    addErrorNotification,
    addSuccessNotification,
}) {
    async function handleProjectLeave() {
        const error = await removeMember(memberId, projectId);
        if (error) {
            addErrorNotification(NOTIFICATIONS.PROJECT.LEAVE_ERROR);
        } else {
            addSuccessNotification(NOTIFICATIONS.PROJECT.LEAVE_SUCCESS);
            history.push(ROUTES.PROJECTS);
        }
        closeModal();
    }

    return (
        <ConfirmationModal
            content={PROJECT_LEAVE_CONTENT}
            onClose={closeModal}
            onConfirm={handleProjectLeave}
            isLoading={isLoading}
            confirmButtonText="Leave"
        />
    );
}

const ConnectedProjectLeaveConfirmationModal = withRouter(
    connect(
        ({ requests, currentProject, currentUser }) => ({
            isLoading: requests.includes(CURRENT_PROJECT.REMOVE_MEMBER),
            projectId: currentProject.project?._id,
            memberId: currentUser._id,
        }),
        (dispatch) => ({
            closeModal: () => dispatch(closeModal(MODALS.PROJECT_LEAVE_CON)),
            removeMember: (memberId, projectId) =>
                dispatch(removeMember({ memberId, projectId })),
            addErrorNotification: (message) =>
                dispatch(addErrorNotification(message)),
            addSuccessNotification: (message) =>
                dispatch(addSuccessNotification(message)),
        })
    )(ProjectLeaveConfirmationModal)
);

export default ConnectedProjectLeaveConfirmationModal;
