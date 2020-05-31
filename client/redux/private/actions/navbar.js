import NAVBAR from '../constants/navbar';

const setProjectsPageActive = () => ({ type: NAVBAR.SET_PROJECTS_PAGE_ACTIVE });

const setProfilePageActive = () => ({ type: NAVBAR.SET_PROFILE_PAGE_ACTIVE });

const removeActive = () => ({ type: NAVBAR.REMOVE_ACTIVE });

export { setProjectsPageActive, setProfilePageActive, removeActive };
