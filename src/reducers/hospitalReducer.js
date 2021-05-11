import {GET_HOSPITAL_INFO, DELETE_HOSPITAL_INFO, ADD_HOSPITAL_INFO} from '../actions/actionTypes';

const INITIAL_STATE = {};

function hospitalReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ADD_HOSPITAL_INFO:
			return action.payload;
	
      case DELETE_HOSPITAL_INFO:
        return {};

		case GET_HOSPITAL_INFO:
			return {...state, data: action.payload}

		default:
			return state;
	}
}

export default hospitalReducer;
