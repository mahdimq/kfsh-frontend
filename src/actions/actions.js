import {
	LOGIN_USER,
	REGISTER_USER,
	LOGOUT_USER,
	UPDATE_USER,
	FETCH_USER,
	FETCH_ALL_USERS,
	ADD_ALERT,
	REMOVE_ALERTS,
	GET_USER_INFO,
	FETCH_PATIENTS,
	FETCH_PATIENT_INFO,
	ADD_PATIENT
	// UPDATE_PATIENT
} from './actionTypes';

import kfshAPI from '../kfshAPI';

// ########################################################
// ############### ALERTS STATE MANAGEMENT ################
// ########################################################
// DISPLAY ALERTS TO USER
export const addAlert = (message, type) => {
	return { type: ADD_ALERT, payload: { message, type } };
};

export const removeAlerts = () => {
	return { type: REMOVE_ALERTS };
};

// ########################################################
// ################ USER STATE MANAGEMENT #################
// ########################################################
// LOGIN USER
export const loginUser = (data) => {
	return async function (dispatch) {
		try {
			const user = await kfshAPI.login(data);
			localStorage.setItem('user-token', user.token);
			await dispatch(userLoggedIn(user));
			await dispatch(addAlert(`Welcome back ${user.firstname}`, 'success'));
		} catch (err) {
			err.forEach((error) => dispatch(addAlert(error, 'error')));
		}
	};
};

// user logged in
export const userLoggedIn = (user) => {
	return { type: LOGIN_USER, payload: user };
};

// =====================================================
// GET USER DATA
export const getUserData = (token, firstname, id, is_admin) => {
	return { type: FETCH_USER, payload: { token, firstname, id, is_admin } };
};

// =====================================================
// GET ALL USERS
export const fetchUsers = () => {
	return async function (dispatch) {
		try {
			const users = await kfshAPI.getAllUsers();
			if (!users) await dispatch(addAlert('NO USERS FOUND', 'warning'));
			await dispatch(gotAllUsers(users));
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
			});
		}
	};
};

// get all users
const gotAllUsers = (gotUsers) => {
	return { type: FETCH_ALL_USERS, payload: gotUsers };
};

// =====================================================
// GET USER BIO
export const getUserInfo = (id) => {
	return async function (dispatch) {
		try {
			const user = await kfshAPI.getUser(id);
			return dispatch(getUserBio(user));
		} catch (err) {
			err.forEach((error) => dispatch(addAlert(error, 'error')));
		}
	};
};

function getUserBio(user) {
	return { type: GET_USER_INFO, payload: user };
}

// =====================================================
// UPDATE USER
export const updateUser = (id, data) => {
	return async function (dispatch) {
		try {
			const user = await kfshAPI.updateUser(id, data);
			await dispatch(userUpdated(user));
			await dispatch(addAlert(`User Information updated!`, 'info'));
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
				// dispatch(addAlert('Invalid Password', 'error'));
			});
		}
	};
};

// updated user
const userUpdated = (user) => {
	return { type: UPDATE_USER, payload: user };
};

// =====================================================
// REGISTER A NEW USER
export const registerUser = (data) => {
	return async function (dispatch) {
		try {
			const user = await kfshAPI.register(data);
			localStorage.setItem('user-token', user.token);
			await dispatch(userRegistered(user));
			await dispatch(
				addAlert(`Registration Successful! Welcome ${data.firstname}!`, 'success')
			);
		} catch (err) {
			err.forEach((error) => dispatch(addAlert(error, 'error')));
		}
	};
};

// user registered
const userRegistered = (user) => {
	return { type: REGISTER_USER, payload: user };
};

// =====================================================
// DELETE USER
export const removeUser = (id, token) => {
	return async function (dispatch) {
		try {
			await kfshAPI.deleteUser(id, token);
			dispatch(addAlert(`User with ID: ${id} has been deleted`, 'error'));
			await dispatch(logout());
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
			});
		}
	};
};

// =====================================================
// LOGOUT USER
export const logoutUser = () => {
	return async function (dispatch) {
		await dispatch(logout());
		await dispatch(addAlert('User logged out', 'warning'));
	};
};
export const logout = () => {
	return { type: LOGOUT_USER };
};

// ########################################################
// ################ PATIENT STATE MANAGEMENT ################
// ########################################################
// RETRIEVE PATIENT INFO FROM DATABASE
export const getPatient = (mrn) => {
	return async function (dispatch) {
		const res = await kfshAPI.getPatient(mrn);
		await dispatch(gotPatient(res));
	};
};

// got Patient
const gotPatient = (patient) => {
	return { type: FETCH_PATIENT_INFO, payload: patient };
};

// =====================================================
// GET ALL PATIENTS FROM DATABASE (test)
export const getAllPatients = () => {
	return async function (dispatch) {
		const patients = await kfshAPI.getAllPatients();
		await dispatch(gotPatients(patients));
	};
};

const gotPatients = (patients) => {
	return { type: FETCH_PATIENTS, payload: patients };
};
// =====================================================
// ADD PATIENT TO DATABASE 
export const addPatient = (data) => {
	return async function (dispatch) {
		try {
			const patient = await kfshAPI.addPatient(data);
			await dispatch(patientAdded(patient));
			await dispatch(
				addAlert(`Patient added Successfully!`, 'success')
			);
		} catch (err) {
			err.forEach((error) => dispatch(addAlert(error, 'error')));
		}
	};
};


// patient added
const patientAdded = (patient) => {
	return { type: ADD_PATIENT, payload: patient };
};

// =====================================================
// GET PATIENT INFORMATION
export const findPatient = (mrn)=>{
	return async function (dispatch) {
		try {
			const patient = await kfshAPI.getPatient(mrn);
			return dispatch(getPatientInfo(patient));
		} catch (err) {
			err.forEach(error => dispatch(addAlert(error, 'error')));
		}
	};
};

function getPatientInfo(patient) {
	return { type: FETCH_PATIENT_INFO, payload: patient };
};


// =====================================================

// // REMOVE PATIENT FROM DATABASE
// export const removeMovie = (id) => {
// 	return async function (dispatch) {
// 		await kfshAPI.deleteMovie(id);
// 		await dispatch(movieRemoved());
// 	};
// };

// const movieRemoved = () => {
// 	return {
// 		type: REMOVE_MOVIE
// 	};
// };

// =====================================================

// // ########################################################
// // ############# WATCHLIST STATE MANAGEMENT ###############
// // ########################################################
// // ADD MOVIE TO WATCHLIST
// export const addToWatchlist = (user_id, data) => {
// 	return async function (dispatch) {
// 		try {
// 			const res = await kfshAPI.addWatchlist(user_id, data);
// 			await dispatch(addedWatchlist(res));
// 			await dispatch(addAlert('Movie added to watchlist', 'info'));
// 		} catch (err) {
// 			err.forEach((error) => {
// 				dispatch(addAlert(error, 'error'));
// 			});
// 		}
// 	};
// };

// // added to watchlist
// const addedWatchlist = (movieData) => {
// 	return { type: ADD_WATCHLIST, payload: movieData };
// };

// // RETRIEVE WATCHLIST FROM DATABASE
// export const loadWatchlist = (user_id) => {
// 	return async function (dispatch) {
// 		try {
// 			const res = await kfshAPI.getWatchlist(user_id);
// 			if (!res) await dispatch(addAlert('NO MOVIES FOUND IN WATCHLIST', 'warning'));
// 			await dispatch(gotWatchlist(res));
// 		} catch (err) {
// 			err.forEach((error) => {
// 				dispatch(addAlert(error, 'error'));
// 			});
// 		}
// 	};
// };

// const gotWatchlist = (watchlist) => {
// 	return { type: LOAD_WATCHLIST, payload: watchlist };
// };

// // REMOVE FROM WATCHLIST
// export const removeWatchlist = (user_id, movie_id) => {
// 	return async function (dispatch) {
// 		await kfshAPI.deleteWatchlist(user_id, movie_id);
// 		await dispatch(removedWatchlist(movie_id));
// 		await dispatch(addAlert('Movie removed from watchlist', 'info'));
// 	};
// };

// // removed from watchlist
// const removedWatchlist = (movie_id) => {
// 	return { type: REMOVE_WATCHLIST, payload: movie_id };
// };
