import CURRENT_TASK from '../constants/currentTask';

const defaultState = { task: null, notFound: false };

function currentTask(state = defaultState, { type, payload }) {
    switch (type) {
        case CURRENT_TASK.GET_SUCCESS:
        case CURRENT_TASK.UPDATE_SUCCESS:
            return {
                task: payload.task,
                notFound: false,
            };
        case CURRENT_TASK.GET_ERROR:
            return {
                task: null,
                notFound: true,
            };

        case CURRENT_TASK.CREATE_SUCCESS:
            return {
                notFound: false,
                task: {
                    ...state.task,
                    tasks: [...state.task.tasks, payload.task],
                },
            };

        case CURRENT_TASK.DELETE:
        case CURRENT_TASK.CLEAR:
            return defaultState;

        default:
            return state;
    }
}

export default currentTask;
