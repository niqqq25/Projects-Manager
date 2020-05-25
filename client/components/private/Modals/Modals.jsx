import React from 'react';

import ProjectCreateModal from './ProjectCreateModal';
import ProjectUpdateModal from './ProjectUpdateModal';
import TaskCreateModal from './TaskCreateModal';

import { connect } from 'react-redux';
import MODALS from '../../../redux/private/constants/modals';

function Modals(props) {
    const {
        isProjectCreateModalOpen,
        isProjectUpdateModalOpen,
        isTaskCreateModalOpen,
    } = props;

    return (
        <>
            {isProjectCreateModalOpen && <ProjectCreateModal />}
            {isProjectUpdateModalOpen && <ProjectUpdateModal />}
            {isTaskCreateModalOpen && <TaskCreateModal />}
        </>
    );
}

const ConnectedModals = connect(({ activeModals }) => ({
    isProjectCreateModalOpen: activeModals.includes(MODALS.PROJECT_CREATE),
    isProjectUpdateModalOpen: activeModals.includes(MODALS.PROJECT_UPDATE),
    isTaskCreateModalOpen: activeModals.includes(MODALS.TASK_CREATE),
}))(Modals);

export default ConnectedModals;
