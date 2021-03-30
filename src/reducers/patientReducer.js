import {FETCH_PATIENTS, FETCH_PATIENT_INFO, UPDATE_PATIENT, ADD_PATIENT} from '../actions/actionTypes';

const INITIAL_STATE = {};

function patientReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ADD_PATIENT:
			return action.payload;
	
		case FETCH_PATIENT_INFO:
		case UPDATE_PATIENT:
			return { ...state, ...action.payload };

		case FETCH_PATIENTS:
			return {...state, patients: action.payload}

		default:
			return state;
	}
}

export default patientReducer;
