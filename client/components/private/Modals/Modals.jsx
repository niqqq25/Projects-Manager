import React from 'react';

import ProjectCreateModal from './ProjectCreateModal';
import ProjectUpdateModal from './ProjectUpdateModal';
import TaskCreateModal from './TaskCreateModal';
import ConfirmationModal from '../../global/ConfirmationModal';

import { connect } from 'react-redux';
import MODALS from '../../../redux/private/constants/modals';

function Modals(props) {
    const {
        isProjectCreateModalOpen,
        isProjectUpdateModalOpen,
        isTaskCreateModalOpen,
        isConfirmationModalOpen,
    } = props;

    return (
        <>
            {isProjectCreateModalOpen && <ProjectCreateModal />}
            {isProjectUpdateModalOpen && <ProjectUpdateModal />}
            {isTaskCreateModalOpen && <TaskCreateModal />}
            {isConfirmationModalOpen && <ConfirmationModal />}
        </>
    );
}

const ConnectedModals = connect(({ activeModals, confirmation }) => ({
    isProjectCreateModalOpen: activeModals.includes(MODALS.PROJECT_CREATE),
    isProjectUpdateModalOpen: activeModals.includes(MODALS.PROJECT_UPDATE),
    isTaskCreateModalOpen: activeModals.includes(MODALS.TASK_CREATE),
    isConfirmationModalOpen: !!confirmation.type,
}))(Modals);

export default ConnectedModals;
