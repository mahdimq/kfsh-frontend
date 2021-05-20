import {
  ADD_PROCEDURE,
  GET_ALL_PROCEDURES,
  GET_SINGLE_PROCEDURE,
  DELETE_PROCEDURE
} from '../actions/actionTypes';

const INITIAL_STATE = {};

function procedureReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PROCEDURE:
      return action.payload;

    case GET_SINGLE_PROCEDURE:
      return { ...state, ...action.payload };

      // CHECK IF THIS IS NEEDED
    case GET_ALL_PROCEDURES:
      return { ...state, procedures: action.payload };

    case DELETE_PROCEDURE:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default procedureReducer;
