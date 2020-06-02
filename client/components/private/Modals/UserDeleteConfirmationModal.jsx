import React from 'react';
import DeleteConfirmationModal from '../../global/DeleteConfirmationModal';

import { connect } from 'react-redux';
import { closeModal } from '../../../redux/private/actions/activeModals';
import { deleteCurrentUser } from '../../../redux/private/actions/currentUser';
import { MODALS, CURRENT_USER } from '../../../redux/private/constants';

const USER_DELETE_CONTENT = 'Do you really want to delete this account?';

const UserDeleteConfirmationModal = ({ isLoading, onClose, onDelete }) => (
    <DeleteConfirmationModal
        content={USER_DELETE_CONTENT}
        onClose={onClose}
        onDelete={onDelete}
        isLoading={isLoading}
    />
);

const ConnectedUserDeleteConfirmationModal = connect(
    ({ requests }) => ({
        isLoading: requests.includes(CURRENT_USER.DELETE),
    }),
    (dispatch) => ({
        onClose: () => dispatch(closeModal(MODALS.USER_DELETE)),
        onDelete: () => dispatch(deleteCurrentUser()),
    })
)(UserDeleteConfirmationModal);

export default ConnectedUserDeleteConfirmationModal;
