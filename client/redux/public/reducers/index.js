import { combineReducers } from 'redux';

import alert from '../../shared/reducers/alert';
import login from '../reducers/login';
import registration from '../reducers/registration';

const rootReducer = combineReducers({ alert, login, registration });

export default rootReducer;
