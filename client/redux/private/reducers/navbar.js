import NAVBAR from '../constants/navbar';

const defaultState = {
    isProjectsPageActive: false,
    isProfilePageActive: false,
};

function navbar(state = defaultState, { type }) {
    switch (type) {
        case NAVBAR.SET_PROJECTS_PAGE_ACTIVE:
            return { ...defaultState, isProjectsPageActive: true };
        case NAVBAR.SET_PROFILE_PAGE_ACTIVE:
            return { ...defaultState, isProfilePageActive: true };
        case NAVBAR.REMOVE_ACTIVE:
            return defaultState;
        default:
            return state;
    }
}

export default navbar;
