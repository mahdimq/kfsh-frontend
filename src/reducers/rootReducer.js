import userReducer from './userReducer';
import alertsReducer from './alertsReducer';
import patientReducer from './patientReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	user: userReducer,
	alerts: alertsReducer,
	patient: patientReducer
});

export default rootReducer;
