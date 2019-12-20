import React, { useContext } from 'react';
import Styled from './ProjectDeleteField.styles';

import ProjectAPI from '../../../../requests/project';
import { ConfirmationModalContext } from '../../../../providers/ConfirmationModalProvider';
import { AlertMessageContext } from '../../../../providers/AlertMessageProvider';

const PROJECT_DELETION_FAIL_MESSAGE = 'Failed to delete account';

export default function ProjectDeleteField({ projectId, history }) {
    const {
        setConfirmationModal,
        setConfirmationModalLoading,
        removeConfirmationModal,
    } = useContext(ConfirmationModalContext);
    const { showAlertMessage } = useContext(AlertMessageContext);

    async function deleteProject() {
        setConfirmationModalLoading(true);
        const response = await ProjectAPI.remove(projectId);
        removeConfirmationModal();

        if (response.error) {
            onProjectDeleteFail();
        } else {
            onProjectDeleteSuccess();
        }
    }

    function onProjectDeleteSuccess() {
        history.push({
            pathname: '/home',
            state: { projectDeleted: true },
        });
    }

    function onProjectDeleteFail() {
        showAlertMessage({ text: PROJECT_DELETION_FAIL_MESSAGE, fail: true });
    }

    return (
        <Styled.DeleteProjectField>
            Useless?{' '}
            <Styled.DeleteProjectField__Link
                onClick={() =>
                    setConfirmationModal({ onConfirm: deleteProject })
                }
            >
                Delete project
            </Styled.DeleteProjectField__Link>
        </Styled.DeleteProjectField>
    );
}
