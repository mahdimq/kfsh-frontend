import {GET_HOSPITAL_INFO, DELETE_HOSPITAL_INFO, ADD_HOSPITAL_INFO} from '../actions/actionTypes';

const INITIAL_STATE = {};

function hospitalReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ADD_HOSPITAL_INFO:
			return {...state, ...action.payload };
	
      case DELETE_HOSPITAL_INFO:
        return {
          // ...state,
          // procedures: procedures.filter((item) => item.id !== action.id),
          // locations: locations.filter((item) => item.id !== action.id),
          // testCodes: testCodes.filter((item) => item.id !== action.cpt),
          // departments: departments.filter((item) => item.id !== action.id),
          // physicians: physicians.filter((item) => item.id !== action.id),
        };

		case GET_HOSPITAL_INFO:
			return {...state, procedures: action.payload[0], locations: action.payload[1], testCodes: action.payload[2], departments: action.payload[3], physicians: action.payload[4]}

		default:
			return state;
	}
}

export default hospitalReducer;
