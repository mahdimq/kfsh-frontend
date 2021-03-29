import { ADD_ALERT, REMOVE_ALERTS } from '../actions/actionTypes';

const INITIAL_STATE = [];

const alertsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_ALERT:
			return [...state, action.payload];

		case REMOVE_ALERTS:
			return INITIAL_STATE;

		default:
			return state;
	}
};

export default alertsReducer;
