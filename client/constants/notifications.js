export default {
    USER: {
        REGISTER_SUCCESS: 'You have successfully registered.',
        DELETE_SUCCESS: 'User has been successfully deleted.', //rename it
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
        UPDATE_ERROR: 'Failed to update new project.',
        DELETE_SUCCESS: 'Project has been successfully deleted.',
        DELETE_ERROR: 'Failed to delete project.',
    },
    TASK: {
        CREATE_SUCCESS: 'Task has been successfully created.',
        CREATE_ERROR: 'Failed to create new task.',
    },
};
