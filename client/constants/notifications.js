export default {
    USER: {
        REGISTER_SUCCESS: 'You have successfully registered.',
        DELETE_SUCCESS: 'User has been successfully deleted.',
        DELETE_ERROR:
            'Failed to delete user, make sure you dont own any projects.',
        LOGIN_ERROR:
            'The username or password you entered did not match our records. Please double-check and try again.',
        UPDATE_SUCCESS: 'The changes have been saved.',
    },
    PROJECT: {
        GET_ALL_ERROR: 'Failed to fetch projects.',
        CREATE_SUCCESS: 'Project has been successfully created.',
        CREATE_ERROR: 'Failed to create new project.',
        UPDATE_SUCCESS: 'Project has been successfully updated.',
        UPDATE_ERROR: 'Failed to update project.',
        DELETE_SUCCESS: 'Project has been successfully deleted.',
        DELETE_ERROR: 'Failed to delete project.',
        MEMBER_REMOVE_SUCCESS:
            'Member has been successfully removed from the project.',
        MEMBER_REMOVE_ERROR: 'Failed to remove member from the project.',
        MEMBER_ADD_SUCCESS: 'User has been successfully added to the project.',
        MEMBER_ADD_ERROR: 'Failed to add user to the project.',
        OWNER_CHANGE_SUCCESS: 'Projects owner has been successfully changed.',
        OWNER_CHANGE_ERROR: 'Failed to change projects owner.',
        LEAVE_SUCCESS: 'You successfully left the project.',
        LEAVE_ERROR: 'Failed to leave the project.',
    },
    TASK: {
        CREATE_SUCCESS: 'Task has been successfully created.',
        CREATE_ERROR: 'Failed to create new task.',
        DELETE_SUCCESS: 'Task has been successfully deleted.',
        DELETE_ERROR: 'Failed to delete task.',
        UPDATE_SUCCESS: 'Task has been successfully updated.',
        UPDATE_ERROR: 'Failed to update task.',
    },
};
