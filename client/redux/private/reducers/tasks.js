import TASKS from '../constants/tasks';

const defaultState = {
    tasks: [],
    error: null,
};

function tasks(state = defaultState, { type, payload }) {
    switch (type) {
        case TASKS.GET_SUCCESS:
            return {
                tasks: payload.tasks,
                error: null,
            };
        case TASKS.GET_ERROR:
            return {
                ...state,
                error: payload.error,
            };
        case TASKS.CREATE_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, payload.task],
            };
        default:
            return state;
    }
}

export default tasks;
