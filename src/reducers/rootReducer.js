import userReducer from './userReducer';
import alertsReducer from './alertsReducer';
import patientReducer from './patientReducer';
import { combineReducers } from 'redux';
import procedureReducer from './procedureReducer';
import hospitalReducer from './hospitalReducer';
import visitDetailReducer from './visitDetailReducer';

const rootReducer = combineReducers({
	users: userReducer,
	alerts: alertsReducer,
	patients: patientReducer,
  procedure: procedureReducer,
  hospital: hospitalReducer,
  visitDetails: visitDetailReducer
});

export default rootReducer;
