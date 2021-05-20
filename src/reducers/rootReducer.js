import userReducer from './userReducer';
import alertsReducer from './alertsReducer';
import patientReducer from './patientReducer';
import { combineReducers } from 'redux';
import procedureReducer from './procedureReducer';
import hospitalReducer from './hospitalReducer';
import visitTestReducer from './visitTestReducer';

const rootReducer = combineReducers({
	user: userReducer,
	alerts: alertsReducer,
	patient: patientReducer,
  procedure: procedureReducer,
  hospital: hospitalReducer,
  visitTest: visitTestReducer
});

export default rootReducer;
