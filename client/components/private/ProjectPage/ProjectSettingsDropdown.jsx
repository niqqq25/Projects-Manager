import React from 'react';
import { FiSettings } from 'react-icons/fi';

import {
    ProjectSettingsButton,
    DropdownItem,
} from './styled/ProjectSettingsDropdown';
import Dropdown from '../../global/Dropdown';

import { connect } from 'react-redux';
import { openModal } from '../../../redux/private/actions/activeModals';
import MODALS from '../../../redux/private/constants/modals';

function _ProjectSettingsDropdown({
    currentUser,
    projectOwner,
    openProjectUpdateModal,
    openProjectDeleteConfirmationModal,
    openMembersManageModal,
    openProjectLeaveConfirmationModal,
}) {
    const isOwner = currentUser._id === projectOwner._id;

    return (
        <Dropdown
            toggle={
                <ProjectSettingsButton>
                    <FiSettings size="20px" />
                </ProjectSettingsButton>
            }
            content={
                isOwner ? (
                    <>
                        <DropdownItem onMouseDown={openProjectUpdateModal}>
                            Update Project
                        </DropdownItem>
                        <DropdownItem onMouseDown={openMembersManageModal}>
                            Manage Members
                        </DropdownItem>
                        <DropdownItem
                            danger
                            onMouseDown={openProjectDeleteConfirmationModal}
                        >
                            Delete Project
                        </DropdownItem>
                    </>
                ) : (
                    <DropdownItem
                        danger
                        onMouseDown={openProjectLeaveConfirmationModal}
                    >
                        Leave Project
                    </DropdownItem>
                )
            }
        />
    );
}

const ConnectedProjectSettingsDropdown = connect(
    ({ currentProject, currentUser }) => ({
        currentUser,
        projectOwner: currentProject.project.owner,
    }),
    (dispatch) => ({
        openProjectUpdateModal: () =>
            dispatch(openModal(MODALS.PROJECT_UPDATE)),
        openProjectDeleteConfirmationModal: () =>
            dispatch(openModal(MODALS.PROJECT_DELETE_CON)),
        openMembersManageModal: () =>
            dispatch(openModal(MODALS.MEMBERS_MANAGE)),
        openProjectLeaveConfirmationModal: () =>
            dispatch(openModal(MODALS.PROJECT_LEAVE_CON)),
    })
)(_ProjectSettingsDropdown);

export default ConnectedProjectSettingsDropdown;
