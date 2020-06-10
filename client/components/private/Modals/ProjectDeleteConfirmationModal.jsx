import React from 'react';
import { withRouter } from 'react-router-dom';
import ConfirmationModal from '../../global/ConfirmationModal';
import ROUTES from '../../../constants/routes';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { deleteCurrentProject } from '../../../redux/private/actions/currentProject';
import { MODALS, CURRENT_PROJECT } from '../../../redux/private/constants';

const PROJECT_DELETE_CONTENT = 'Do you really want to delete this project?';

function ProjectDeleteConfirmationModal({
    project,
    isLoading,
    closeModal,
    deleteProject,
    history,
}) {
    async function handleProjectDelete() {
        const error = await deleteProject(project._id);
        closeModal();

        if (!error) {
            history.push(ROUTES.PROJECTS);
        }
    }

    return (
        <ConfirmationModal
            content={PROJECT_DELETE_CONTENT}
            onClose={closeModal}
            onConfirm={handleProjectDelete}
            isLoading={isLoading}
            confirmButtonText="Delete"
        />
    );
}

const ConnectedProjectDeleteConfirmationModal = withRouter(
    connect(
        ({ requests, currentProject }) => ({
            isLoading: requests.includes(CURRENT_PROJECT.DELETE),
            project: currentProject.project,
        }),
        (dispatch) => ({
            closeModal: () => dispatch(closeModal(MODALS.PROJECT_DELETE_CON)),
            deleteProject: (id) => dispatch(deleteCurrentProject(id)),
        })
    )(ProjectDeleteConfirmationModal)
);

export default ConnectedProjectDeleteConfirmationModal;
