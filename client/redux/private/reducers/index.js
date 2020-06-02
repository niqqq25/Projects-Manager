import { combineReducers } from 'redux';

import currentUser from './currentUser';
import projects from './projects';
import currentProject from './currentProject';
import tasks from './tasks';
import activeModals from './activeModals';
import navbar from './navbar';

//shared
import notifications from '../../shared/reducers/notifications';
import requests from '../../shared/reducers/requests';

const rootReducer = combineReducers({
    notifications,
    requests,
    currentUser,
    projects,
    currentProject,
    tasks,
    activeModals,
    navbar,
});

export default rootReducer;
