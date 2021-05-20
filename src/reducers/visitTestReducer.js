import {
  FETCH_VISITTESTS,
  FETCH_VISITTEST,
  ADD_VISITTEST,
  DELETE_VISITTEST
} from '../actions/actionTypes';

const INITIAL_STATE = {};

function visitTestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_VISITTEST:
      return action.payload;

    case FETCH_VISITTESTS:
      return { ...state, visitTests: action.payload };

    // case FETCH_VISITTEST:
    //   return { ...state, ...action.payload };

    case FETCH_VISITTEST:
      return {...state, visitTest: action.payload}

    case DELETE_VISITTEST:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default visitTestReducer;
