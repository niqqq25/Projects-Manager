import React from 'react';

import ProjectCreateModal from './ProjectCreateModal';
import ProjectUpdateModal from './ProjectUpdateModal';
import TaskCreateModal from './TaskCreateModal';
import MembersManageModal from './MembersManageModal';
import MemberAddModal from './MemberAddModal';
import UserDeleteConfirmationModal from './UserDeleteConfirmationModal';
import ProjectDeleteConfirmationModal from './ProjectDeleteConfirmationModal';
import MemberRemoveConfirmationModal from './MemberRemoveConfirmationModal';
import OwnerChangeConfirmationModal from './OwnerChangeConfirmationModal';
import ProjectLeaveConfirmationModal from './ProjectLeaveConfirmationModal';
import MemberAddConfirmationModal from './MemberAddConfirmationModal';

import { connect } from 'react-redux';
import MODALS from '../../../redux/private/constants/modals';

function Modals(props) {
    const {
        isProjectCreateModalOpen,
        isProjectUpdateModalOpen,
        isTaskCreateModalOpen,
        isMembersManageModalOpen,
        isMemberAddModalOpen,
        isUserDeleteConfirmationModalOpen,
        isProjectDeleteConfirmationModalOpen,
        isMemberRemoveConfirmationModalOpen,
        isOwnerChangeConfirmationModalOpen,
        isProjectLeaveConfirmationModalOpen,
        isMemberAddConfirmationModalOpen,
    } = props;

    return (
        <>
            {isProjectCreateModalOpen && <ProjectCreateModal />}
            {isProjectUpdateModalOpen && <ProjectUpdateModal />}
            {isTaskCreateModalOpen && <TaskCreateModal />}
            {isMembersManageModalOpen && <MembersManageModal />}
            {isMemberAddModalOpen && <MemberAddModal />}
            {isUserDeleteConfirmationModalOpen && (
                <UserDeleteConfirmationModal />
            )}
            {isProjectDeleteConfirmationModalOpen && (
                <ProjectDeleteConfirmationModal />
            )}
            {isMemberRemoveConfirmationModalOpen && (
                <MemberRemoveConfirmationModal />
            )}
            {isOwnerChangeConfirmationModalOpen && (
                <OwnerChangeConfirmationModal />
            )}
            {isProjectLeaveConfirmationModalOpen && (
                <ProjectLeaveConfirmationModal />
            )}
            {isMemberAddConfirmationModalOpen && <MemberAddConfirmationModal />}
        </>
    );
}

const ConnectedModals = connect(({ activeModals }) => {
    const activeModalsTypes = activeModals.map(({ type }) => type);
    return {
        isProjectCreateModalOpen: activeModalsTypes.includes(
            MODALS.PROJECT_CREATE
        ),
        isProjectUpdateModalOpen: activeModalsTypes.includes(
            MODALS.PROJECT_UPDATE
        ),
        isTaskCreateModalOpen: activeModalsTypes.includes(MODALS.TASK_CREATE),
        isUserDeleteConfirmationModalOpen: activeModalsTypes.includes(
            MODALS.USER_DELETE_CON
        ),
        isProjectDeleteConfirmationModalOpen: activeModalsTypes.includes(
            MODALS.PROJECT_DELETE_CON
        ),
        isMembersManageModalOpen: activeModalsTypes.includes(
            MODALS.MEMBERS_MANAGE
        ),
        isMemberAddModalOpen: activeModalsTypes.includes(MODALS.MEMBER_ADD),
        isMemberRemoveConfirmationModalOpen: activeModalsTypes.includes(
            MODALS.MEMBER_REMOVE_CON
        ),
        isOwnerChangeConfirmationModalOpen: activeModalsTypes.includes(
            MODALS.OWNER_CHANGE_CON
        ),
        isProjectLeaveConfirmationModalOpen: activeModalsTypes.includes(
            MODALS.PROJECT_LEAVE_CON
        ),
        isMemberAddConfirmationModalOpen: activeModalsTypes.includes(
            MODALS.MEMBER_ADD_CON
        ),
    };
})(Modals);

export default ConnectedModals;
