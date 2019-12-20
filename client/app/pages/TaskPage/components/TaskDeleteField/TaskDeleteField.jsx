import React, { useContext } from 'react';
import Styled from './TaskDeleteField.styles';

import { ConfirmationModalContext } from '../../../../providers/ConfirmationModalProvider';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';
import TaskAPI from '../../../../requests/task';

const TASK_DELETION_FAIL_MESSAGE = 'Failed to delete task';

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
        showAlertMessage({ text: TASK_DELETION_FAIL_MESSAGE, fail: true });
    }

    return (
        <Styled.DeleteProjectField>
            Useless?{' '}
            <Styled.DeleteProjectField__Link
                onClick={() => setConfirmationModal({ onConfirm: deleteTask })}
            >
                Delete task
            </Styled.DeleteProjectField__Link>
        </Styled.DeleteProjectField>
    );
}
