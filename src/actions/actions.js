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
  FETCH_PATIENT,
  ADD_PATIENT,
  GET_HOSPITAL_INFO,
  GET_VISIT,
  ADD_VISIT,
  FETCH_VISITTESTS,
  ADD_VISITTEST
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
      dispatch(
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
      await dispatch(logout());
    } catch (err) {
      await dispatch(addAlert(err, 'error'));
    }
  };
};

// =====================================================
// LOGOUT USER
export const logoutUser = () => {
  return async function(dispatch) {
    await dispatch(logout());
    dispatch(addAlert('User logged out', 'warning'));
  };
};
export const logout = () => {
  return { type: LOGOUT_USER };
};

// ########################################################
// ############### PATIENT STATE MANAGEMENT ###############
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
  return { type: FETCH_PATIENT, payload: patient };
  // return { type: FETCH_PATIENT_INFO, payload: patient };
};

// =====================================================
// GET ALL PATIENTS FROM DATABASE (test)
export const getAllPatients = () => {
  return async function(dispatch) {
    try {
      const patients = await kfshAPI.getAllPatients();
      if(!patients) dispatch(addAlert("No Patients found", 'warning'));
      dispatch(gotPatient(patients));
    } catch (err) {
      err.forEach(error => {
        dispatch(addAlert(error, 'error'))
      })
    }
    // await dispatch(gotPatients(patients));
  };
};

// got all patients
// const gotPatients = (patients) => {
  // return { type: FETCH_PATIENT, payload: patients };
  // return { type: FETCH_PATIENTS, payload: patients };
// };

// =====================================================
// ADD PATIENT TO DATABASE
export const addPatient = (data) => {
  return async function(dispatch) {
    try {
      const patient = await kfshAPI.addPatient(data);
      dispatch(patientAdded(patient));
      dispatch(addAlert(`Patient with MRN: ${data.mrn} added Successfully!`, 'success'));
    } catch (err) {
        dispatch(addAlert(err, 'error'));
    }
  };
};

// patient added
const patientAdded = (patientData) => {
  return { type: ADD_PATIENT, payload: patientData };
};

// =====================================================
// GET PATIENT INFORMATION
export const findPatient = (mrn) => {
  return async function(dispatch) {
    try {
      const patient = await kfshAPI.getPatient(mrn);
      return dispatch(gotPatient(patient));
      // return dispatch(getPatientInfo(patient));
    } catch (err) {
      err.forEach((error) => dispatch(addAlert(error, 'error')));
    }
  };
};

// // got patient
// function getPatientInfo(patientInfo) {
//   return { type: FETCH_PATIENT, payload: patientInfo };
// }

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
      const data = await Promise.all([kfshAPI.getProcedures(), kfshAPI.getLocations(), kfshAPI.getTestCodes(), kfshAPI.getDepartments(), kfshAPI.getPhysicians()])
      
       if (!data) await dispatch(addAlert('NO HOSPITAL DATA FOUND', 'warning'));
      await dispatch(gotData(data));
    } catch (err) {
      err.forEach((error) => {
        dispatch(addAlert(error, 'error'));
      });
    }
  };
};

// gotData from database
const gotData = (data) => {
  return { type: GET_HOSPITAL_INFO, payload: data };
};

// ########################################################
// ############# VISIT STATE MANAGEMENT ###############
// ########################################################

// // RETRIEVE ALL VISITS FOR SINGLE PATIENT
export const fetchVisits = (log) => {
	return async function (dispatch) {
		try {
      const res = await kfshAPI.getVisits(log);
      if (!res) await dispatch(addAlert('NO VISITS FOUND', 'warning'));
			await dispatch(gotVisit(res));
		} catch (err) {
      err.forEach((error) => {
        dispatch(addAlert(error, 'error'));
			});
		}
	};
};

// GET VISIT DETAILS FOR PATIENT FROM DATABASE
export const fetchVisitDetail = (log) => {
  return async function(dispatch) {
    const res = await kfshAPI.getVisitDetail(log);
    await dispatch(gotVisit(res));
    // await dispatch(gotVisitDetail(res));
  };
};


// RETRIEVE ALL PATIENTS VISITS FROM DB
export const fetchAllVisits = () => {
  return async function(dispatch) {
    const res = await kfshAPI.getAllVisits();
    await dispatch(gotVisit(res));
  };
};

// ADD VISIT FOR SINGLE PATIENT
export const addSingleVisit = (mrn, data) => {
  return async function(dispatch) {
    try {
      const res = await kfshAPI.addVisit(mrn, data);
      await dispatch(addedVisit(res));
      dispatch(addAlert(`Visit for patient: ${mrn} added successfully, please enter tests done!`, 'success'));
    } catch (err) {
      dispatch(addAlert(err, 'error'))
    }
  };
};

// // got visits
// const gotVisits = (data) => {
//   return { type: GET_VISITS, payload: data};
// };

// got visits
const gotVisit = (data) => {
  return { type: GET_VISIT, payload: data};
};

// Add Visit
const addedVisit = (data) => {
  return {type: ADD_VISIT, payload: data}
}

// ########################################################
// ############# VISIT TEST STATE MANAGEMENT ##############
// ########################################################

// GET VISIT DETAILS FOR ALL PATIENTS
export const fetchVisitDetails = () => {
  return async function(dispatch) {
    const res = await kfshAPI.getVisitDetails();
    await dispatch(gotVisitDetails(res));
  };
};

// got visits
const gotVisitDetails = (data) => {
  return { type: FETCH_VISITTESTS, payload: data};
};

// ADD VISIT DETAIL FOR SINGLE PATIENT
export const addVisitDetail = (log, data) => {
  return async function(dispatch){
    const res = await kfshAPI.addVisitDetail(log, data);
    await dispatch(addedVisitDetail(res))
  };
};

// added visit details
const addedVisitDetail = (data) => {
  return {type: ADD_VISITTEST, payload: data}
}
// // got visits
// const gotVisitDetail = (data) => {
//   return { type: FETCH_VISITTEST, payload: data};
// };