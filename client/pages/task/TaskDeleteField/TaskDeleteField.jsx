import React, { useContext } from 'react';
import './taskDeleteField.css';

import { ConfirmationModalContext } from '../../../providers/ConfirmationModalProvider';
import { AlertMessageContext } from '../../../providers/AlertMessageProvider';
import * as TaskAPI from '../../../requests/task';
import { REFUSED } from 'dns';

const TASK_DELETION_FAIL_MESSAGE = 'Failed to delete account';

export default function TaskDeleteField({ task, history }) {
    const {
        setConfirmationModal,
        setConfirmationModalLoading,
        removeConfirmationModal,
    } = useContext(ConfirmationModalContext);
    const { showAlertMessage } = useContext(AlertMessageContext);

    async function deleteTask() {
        setConfirmationModalLoading(true);
        const response = await TaskAPI.remove(task._id);
        removeConfirmationModal();

        if (response.error) {
            onTaskDeleteFail();
        } else {
            onTaskDeleteSuccess();
        }
    }

    function onTaskDeleteSuccess() {
        const relativeURL = `/projects/${task.project._id}${
            task.parentTask ? `/tasks/${task.parentTask._id}` : ''
        }`;
        history.push({ pathname: relativeURL, state: { taskDeleted: true } });
    }

    function onTaskDeleteFail() {
        showAlertMessage({ text: TASK_DELETION_FAIL_MESSAGE });
    }

    return (
        <p id="delete-task-text">
            Useless?{' '}
            <a
                id="delete-task-link"
                onClick={() => setConfirmationModal({ onConfirm: deleteTask })}
            >
                Delete project
            </a>
        </p>
    );
}
