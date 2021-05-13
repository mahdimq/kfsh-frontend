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
  ADD_PATIENT,
  // UPDATE_PATIENT
  GET_HOSPITAL_INFO,
  DELETE_HOSPITAL_INFO,
  ADD_HOSPITAL_INFO,
  ADD_PROCEDURE,
  GET_ALL_PROCEDURES,
  GET_SINGLE_PROCEDURE,
  DELETE_PROCEDURE,
  GET_VISITS,
  GET_VISIT,
  ADD_VISIT,
  DELETE_VISIT
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
  return async function(dispatch) {
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
  return async function(dispatch) {
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
  return async function(dispatch) {
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
  return async function(dispatch) {
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
  return async function(dispatch) {
    try {
      const user = await kfshAPI.register(data);
      // localStorage.setItem('user-token', user.token);
      await dispatch(userRegistered(user));
      await dispatch(
        addAlert(
          `Registration Successful! ${data.firstname}'s account has been created!`,
          'success'
        )
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
  return async function(dispatch) {
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
  return async function(dispatch) {
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
  return async function(dispatch) {
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
  return async function(dispatch) {
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
  return async function(dispatch) {
    try {
      const patient = await kfshAPI.addPatient(data);
      await dispatch(patientAdded(patient));
      await dispatch(addAlert(`Patient added Successfully!`, 'success'));
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
export const findPatient = (mrn) => {
  return async function(dispatch) {
    try {
      const patient = await kfshAPI.getPatient(mrn);
      return dispatch(getPatientInfo(patient));
    } catch (err) {
      err.forEach((error) => dispatch(addAlert(error, 'error')));
    }
  };
};

function getPatientInfo(patient) {
  return { type: FETCH_PATIENT_INFO, payload: patient };
}

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

// ########################################################
// ############# HOSPITAL STATE MANAGEMENT ###############
// ########################################################
// GET LOCATION/TEST/DEPARTMENT FROM DATABASE
export const loadHospitalData = () => {
  return async function(dispatch) {
    try {
      const data = await Promise.all([kfshAPI.getLocations(),kfshAPI.getTests(), kfshAPI.getDepartments(), kfshAPI.getPhysicians()]) ;
      await dispatch(gotData(data));
      if (!data) await dispatch(addAlert('NO HOSPITAL DATA FOUND', 'warning'));
//       const locations = await kfshAPI.getLocations() ;
//       await dispatch(gotData(locations));
//       if (!locations) await dispatch(addAlert('NO LOCATION DATA FOUND', 'warning'));

//       const tests = await kfshAPI.getTests() ;
//       await dispatch(gotData(tests));
//       if (!tests) await dispatch(addAlert('NO TEST DATA FOUND', 'warning'));

//       const physicians = await kfshAPI.getPhysicians();
//       await dispatch(gotData(physicians));
//       if (!physicians) await dispatch(addAlert('NO PHYSICIAN DATA FOUND', 'warning'));

//       const departments = await kfshAPI.getDepartments();
//       await dispatch(gotData(departments));
//       if (!departments) await dispatch(addAlert('NO PHYSICIAN DATA FOUND', 'warning'));

    } catch (err) {
      err.forEach((error) => {
        dispatch(addAlert(error, 'error'));
      });
    }
  };
};

// export const loadLocations = () => {
//   return async function(dispatch) {
//     try {
//       // const data = await Promise.all([kfshAPI.getLocations(),kfshAPI.getTests(), kfshAPI.getDepartments(), kfshAPI.getPhysicians()]) ;
//       // await dispatch(gotData(data));
//       // if (!data) await dispatch(addAlert('NO HOSPITAL DATA FOUND', 'warning'));
//       const locations = await kfshAPI.getLocations();
//       await dispatch(gotData(locations));
//       if (!locations) await dispatch(addAlert('NO LOCATION DATA FOUND', 'warning'));
//     } catch (err) {
//       err.forEach((error) => {
//         dispatch(addAlert(error, 'error'));
//       });
//     }
//   };
// };
// export const loadDepartments = () => {
//   return async function(dispatch) {
//     try {
//       const departments = await kfshAPI.getDepartments();
//       await dispatch(gotData(departments));
//       if (!departments) await dispatch(addAlert('NO PHYSICIAN DATA FOUND', 'warning'));
//     } catch (err) {
//       err.forEach((error) => {
//         dispatch(addAlert(error, 'error'));
//       });
//     }
//   };
// };

// export const loadTests = () => {
//   return async function(dispatch) {
//     try {
//       const tests = await kfshAPI.getTests();
//       await dispatch(gotData(tests));
//       if (!tests) await dispatch(addAlert('NO TEST DATA FOUND', 'warning'));
//     } catch (err) {
//       err.forEach((error) => {
//         dispatch(addAlert(error, 'error'));
//       });
//     }
//   };
// };

// export const loadPhysicians = () => {
//   return async function(dispatch) {
//     try {
//       const physicians = await kfshAPI.getPhysicians();
//       await dispatch(gotData(physicians));
//       if (!physicians) await dispatch(addAlert('NO PHYSICIAN DATA FOUND', 'warning'));
//     } catch (err) {
//       err.forEach((error) => {
//         dispatch(addAlert(error, 'error'));
//       });
//     }
//   };
// };

// gotData from database
const gotData = (data) => {
  return { type: GET_HOSPITAL_INFO, payload: data };
};

// ########################################################
// ############# PROCEDURE STATE MANAGEMENT ###############
// ########################################################
// GET ALL PROCEDURES FROM DATABASE
export const fetchAllProcedures = () => {
  return async function(dispatch) {
    try {
      const procedures = await kfshAPI.getProcedures();
      await dispatch(gotProcedures(procedures));
      if (!procedures)
        await dispatch(addAlert('NO PROCEDURES FOUND IN DATABASE', 'warning'));
    } catch (err) {
      err.forEach((error) => {
        dispatch(addAlert(error, 'error'));
      });
    }
  };
};

const gotProcedures = (data) => {
  return { type: GET_ALL_PROCEDURES, payload: data };
};

// GET SINGLE PROCEDURE BY PATIENT
export const fetchSingleProcedure = (name) => {
  return async function(dispatch) {
    try {
      const procedure = await kfshAPI.getProcedureByMrn(name);
      await dispatch(gotProcedure(procedure));
    } catch (err) {
      err.forEach((error) => dispatch(addAlert(error, 'error')));
    }
  };
};

const gotProcedure = (procedure) => {
  return { type: GET_SINGLE_PROCEDURE, payload: procedure };
};

// ALL SINGLE PROCEDURE
export const addSingleProcedure = (data) => {
  return async function(dispatch) {
    try {
      const procedure = await kfshAPI.addProcedure(data);
      await dispatch(procedureAdded(procedure));
      dispatch(addAlert(`Procedure added Successfully!`, 'success'));
    } catch (err) {
      err.forEach((error) => dispatch(addAlert(error, 'error')));
    }
  };
};

const procedureAdded = (procedure) => {
  return { type: ADD_PROCEDURE, payload: procedure };
};

// REMOVE SINGLE PROCEDURE
export const removeProcedure = (mrn, token) => {
  return async function(dispatch) {
    try {
      await kfshAPI.deleteProcedure(mrn, token);
      dispatch(addAlert(`Procedure for Patient ${mrn} has been deleted`, 'error'));
    } catch (err) {
      err.forEach((error) => {
        dispatch(addAlert(error, 'error'));
      });
    }
  };
};

// ########################################################
// ############# VISIT STATE MANAGEMENT ###############
// ########################################################

// // RETRIEVE VISITS FROM DATABASE
export const fetchVisits = (mrn) => {
	return async function (dispatch) {
		try {
			const res = await kfshAPI.getVisits(mrn);
			if (!res) await dispatch(addAlert('NO VISITS FOUND', 'warning'));
			await dispatch(gotVisits(res));
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
			});
		}
	};
};

const gotVisits = (data) => {
	return { type: GET_VISITS, payload: data};
};

export const getVisitInfo = (mrn) => {
  return async function(dispatch) {
    const res = await kfshAPI.getVisits(mrn);
    await dispatch(gotVisiting(res));
  };
};

// got Patient
const gotVisiting = (mrn) => {
  return { type: GET_VISITS, payload: mrn };
};

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
