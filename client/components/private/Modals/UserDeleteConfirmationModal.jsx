import React from 'react';
import ConfirmationModal from '../../global/ConfirmationModal';
import ROUTES from '../../../constants/routes';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { deleteCurrentUser } from '../../../redux/private/actions/currentUser';
import { MODALS, CURRENT_USER } from '../../../redux/private/constants';

const USER_DELETE_CONTENT = 'Do you really want to delete this account?';

function UserDeleteConfirmationModal({ isLoading, closeModal, deleteUser }) {
    async function handleUserDelete() {
        const error = await deleteUser();
        closeModal();

        if (!error) {
            window.location = `${ROUTES.LOGIN}?userDelete=true`;
        }
    }

    return (
        <ConfirmationModal
            content={USER_DELETE_CONTENT}
            onClose={closeModal}
            onConfirm={handleUserDelete}
            isLoading={isLoading}
            confirmButtonText="Delete"
        />
    );
}

const ConnectedUserDeleteConfirmationModal = connect(
    ({ requests }) => ({
        isLoading: requests.includes(CURRENT_USER.DELETE),
    }),
    (dispatch) => ({
        closeModal: () => dispatch(closeModal(MODALS.USER_DELETE_CON)),
        deleteUser: () => dispatch(deleteCurrentUser()),
    })
)(UserDeleteConfirmationModal);

export default ConnectedUserDeleteConfirmationModal;
