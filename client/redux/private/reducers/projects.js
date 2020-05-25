import PROJECTS from '../constants/projects';

function projects(state = [], { type, payload }) {
    switch (type) {
        case PROJECTS.GET_SUCCESS:
            return payload.projects;
        case PROJECTS.CREATE_SUCCESS:
            return [...state, payload.project];
        default:
            return state;
    }
}

export default projects;
