import { combineReducers } from 'redux';

import alert from '../../shared/reducers/alert';
import requesting from './requesting';
import currentUser from './currentUser';
import confirmation from './confirmation';
import projects from './projects';
import projectCreateModal from './projectCreateModal';

const rootReducer = combineReducers({
    alert,
    requesting,
    currentUser,
    confirmation,
    projects,
    projectCreateModal,
});

export default rootReducer;
