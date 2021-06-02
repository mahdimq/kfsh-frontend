import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  UPDATE_USER,
  FETCH_USER,
  FETCH_ALL_USERS,
  GET_USER_INFO
} from '../actions/actionTypes';

const INITIAL_STATE = {};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
    case FETCH_USER:
    case REGISTER_USER:
      return action.payload;

    case GET_USER_INFO:
    case UPDATE_USER:
      return { ...state, ...action.payload };

    case FETCH_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };

    case LOGOUT_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default userReducer;
