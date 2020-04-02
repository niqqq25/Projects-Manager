import { combineReducers } from 'redux';

import alert from '../../shared/reducers/alert';
import requesting from '../reducers/requesting';
import currentUser from '../reducers/currentUser';
import confirmation from '../reducers/confirmation';

const rootReducer = combineReducers({
    alert,
    requesting,
    currentUser,
    confirmation,
});

export default rootReducer;
