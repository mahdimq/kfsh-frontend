import userReducer from './userReducer';
import alertsReducer from './alertsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	user: userReducer,
	alerts: alertsReducer
});

export default rootReducer;
