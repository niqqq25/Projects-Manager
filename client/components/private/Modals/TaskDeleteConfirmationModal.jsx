import React from 'react';
import { withRouter } from 'react-router-dom';
import ConfirmationModal from '../../global/ConfirmationModal';
import ROUTES from '../../../constants/routes';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { deleteCurrentTask } from '../../../redux/private/actions/currentTask';
import { MODALS, CURRENT_TASK } from '../../../redux/private/constants';

const TASK_DELETE_CONTENT = 'Do you really want to delete this task?';

function TaskDeleteConfirmationModal({
    isLoading,
    closeModal,
    deleteTask,
    history,
    task,
}) {
    async function handleTaskDelete() {
        const { _id, parentTask, project } = task;
        const error = await deleteTask(_id);
        if (!error) {
            if (parentTask) {
                history.push(`${ROUTES.TASK}/${parentTask._id}`);
            } else {
                history.push(`${ROUTES.PROJECT}/${project._id}`);
            }
        }
        closeModal();
    }

    return (
        <ConfirmationModal
            content={TASK_DELETE_CONTENT}
            onClose={closeModal}
            onConfirm={handleTaskDelete}
            isLoading={isLoading}
            confirmButtonText="Delete"
        />
    );
}

const ConnectedTaskDeleteConfirmationModal = withRouter(
    connect(
        ({ requests, currentTask }) => ({
            isLoading: requests.includes(CURRENT_TASK.DELETE),
            task: currentTask.task,
        }),
        (dispatch) => ({
            closeModal: () => dispatch(closeModal(MODALS.TASK_DELETE_CON)),
            deleteTask: (id) => dispatch(deleteCurrentTask(id)),
        })
    )(TaskDeleteConfirmationModal)
);

export default ConnectedTaskDeleteConfirmationModal;
