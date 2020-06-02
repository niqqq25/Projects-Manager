import React from 'react';

import ProjectCreateModal from './ProjectCreateModal';
import ProjectUpdateModal from './ProjectUpdateModal';
import TaskCreateModal from './TaskCreateModal';
import UserDeleteConfirmationModal from './UserDeleteConfirmationModal';

import { connect } from 'react-redux';
import MODALS from '../../../redux/private/constants/modals';

function Modals(props) {
    const {
        isProjectCreateModalOpen,
        isProjectUpdateModalOpen,
        isTaskCreateModalOpen,
        isUserDeleteConfirmationModalOpen,
    } = props;

    return (
        <>
            {isProjectCreateModalOpen && <ProjectCreateModal />}
            {isProjectUpdateModalOpen && <ProjectUpdateModal />}
            {isTaskCreateModalOpen && <TaskCreateModal />}
            {isUserDeleteConfirmationModalOpen && (
                <UserDeleteConfirmationModal />
            )}
        </>
    );
}

const ConnectedModals = connect(({ activeModals, confirmation }) => ({
    isProjectCreateModalOpen: activeModals.includes(MODALS.PROJECT_CREATE),
    isProjectUpdateModalOpen: activeModals.includes(MODALS.PROJECT_UPDATE),
    isTaskCreateModalOpen: activeModals.includes(MODALS.TASK_CREATE),
    isUserDeleteConfirmationModalOpen: activeModals.includes(
        MODALS.USER_DELETE
    ),
}))(Modals);

export default ConnectedModals;
