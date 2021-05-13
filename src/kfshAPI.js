import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

class kfshAPI {
	
	static async request(endpoint, paramsOrData = {}, verb = 'get') {
		if (!paramsOrData._token) {
			paramsOrData._token = localStorage.getItem('user-token');
		}
		console.debug('API Call:', endpoint, paramsOrData, verb);
		try {
			return (
				await axios({
					method: verb,
					url: `${BASE_URL}/${endpoint}`,
					[verb === 'get' ? 'params' : 'data']: paramsOrData
				})
			).data;
			// axios sends query string data via the "params" key,
			// and request body data via the "data" key,
			// so the key we need depends on the HTTP verb
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// ########################################################
	// #################### USER ENDPOINTS ####################
	// ########################################################

	static async login(data) {
		// Data --> ID & PASSWORD
		const res = await this.request(`login`, data, 'post');
		return res;
	}

	static async register(data) {
		// Data --> USER INFORMATION (firstname, lastname, email)
		const res = await this.request(`users`, data, 'post');
		return res;
	}

	static async getUser(id, data) {
		const res = await this.request(`users/${id}`, data, 'get');
		return res.user;
	}

	static async getAllUsers(){
		const res = await this.request(`users`);
		return res.users;
	}

	static async updateUser(id, data) {
		const res = await this.request(`users/${id}`, data, 'patch');
		return res.user;
	}

	static async deleteUser(id, token) {
		const res = await this.request(`users/${id}`, { _token: token }, 'delete');
		return res.message;
	}

	// ########################################################
	// ################### PATIENT ENDPOINTS ####################
	// ########################################################

	static async addPatient(data) {
		const res = await this.request(`patients/`, data, 'post');
		return res;
	}

	static async getAllPatients() {
		const res = await this.request(`patients`);
		return res.patients;
	}

	static async getPatient(mrn) {
		const res = await this.request(`patients/${mrn}`);
		return res;
	}

	// ########################################################
	// ################# HOSPITAL ENDPOINTS ##################
	// ########################################################

	static async addPhysician(data) {
		let res = await this.request(`physicians/`, data, 'post');
		return res;
	}

	static async getPhysicians() {
		let res = await this.request(`physicians`);
		return res;
	}

	static async getSinglePhysician(id) {
		let res = await this.request(`physicians/${id}`);
		return res;
	}

  static async addDepartment(data) {
		let res = await this.request(`departments/`, data, 'post');
		return res;
	}

	static async getDepartments() {
		let res = await this.request(`departments`);
		return res;
	}

  static async addLocation(data) {
		let res = await this.request(`locations/`, data, 'post');
		return res;
	}

	static async getLocations() {
		let res = await this.request(`locations`);
		return res;
	}
	static async getLocation(id) {
		let res = await this.request(`locations/${id}`);
		return res;
	}

  static async addTest(data) {
		let res = await this.request(`tests/`, data, 'post');
		return res;
	}

	static async getTests() {
		let res = await this.request(`tests`);
		return res;
	}

	static async deletePhysician(physician_id, data) {
		let res = await this.request(`physicians/${physician_id}/`, data, 'delete');
		return res;
	}

	static async deleteDepartment(dept_id, data) {
		let res = await this.request(`departments/${dept_id}/`, data, 'delete');
		return res;
	}

	static async deleteLocation(loc_id, data) {
		let res = await this.request(`locations/${loc_id}/`, data, 'delete');
		return res;
	}

	static async deleteTest(test_id, data) {
		let res = await this.request(`tests/${test_id}/`, data, 'delete');
		return res;
	}

	// ########################################################
	// ##################### PROCEDURES ENDPOINTS ###################
	// ########################################################

	// GET ALL PROCEDURES
	static async getProcedures() {
		const result = await this.request(`procedures`);
		return result;
	}

	// GET SINGLE PROCEDURE BY MRN
	static async getProcedure(id) {
		const result = await this.request(`procedures/${id}`);
		return result;
	}

	// ADD A NEW PROCEDURE
	static async addProcedure(data) {
		const result = await this.request(`procedures/`, data, 'post');
		return result;
	}

	// REMOVE PROCEDURE BY MRN
	static async removeProcedure(mrn, token) {
		const result = await this.request(`procedures/${mrn}`, { _token: token }, 'delete');
		return result.message;
	}


	// ########################################################
	// ##################### VISIT ENDPOINTS ###################
	// ########################################################
	// GET ALL VISITS
  static async getVisits(mrn) {
		const result = await this.request(`visits/${mrn}`);
		return result;
	}
}


export default kfshAPI;