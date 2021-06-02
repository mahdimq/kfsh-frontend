import {
  FETCH_PATIENT,
  FETCH_PATIENTS,
  FETCH_PATIENT_INFO,
  UPDATE_PATIENT,
  ADD_PATIENT,
  GET_VISITS,
  GET_VISIT,
  ADD_VISIT,
  DELETE_VISIT
} from '../actions/actionTypes';

const INITIAL_STATE = {};

function patientReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_VISIT:
    case ADD_PATIENT:
      return action.payload;

    case FETCH_PATIENT_INFO:
    case UPDATE_PATIENT:
      return { ...state, ...action.payload };

    case FETCH_PATIENTS:
      return { ...state, patients: action.payload };
    
      case FETCH_PATIENT:
      return { ...state, patient: action.payload };

    case GET_VISITS:
      return { ...state, visits: action.payload };

    case GET_VISIT:
      return {...state, visit: action.payload}

    case DELETE_VISIT:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default patientReducer;
