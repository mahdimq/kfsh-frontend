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

	// static async deleteMovie(movie_id, token) {
	// 	let res = await this.request(`movies/${movie_id}`, { _token: token }, 'delete');
	// 	return res;
	// }

	// ########################################################
	// ################# WATCHLIST ENDPOINTS ##################
	// ########################################################

	// static async addWatchlist(user_id, data) {
	// 	let res = await this.request(`watchlist/${user_id}/add`, data, 'post');
	// 	return res;
	// }

	// static async getWatchlist(id) {
	// 	let res = await this.request(`watchlist/${id}`);
	// 	return res;
	// }

	// static async deleteWatchlist(user_id, movie_id, data) {
	// 	let res = await this.request(`watchlist/${user_id}/${movie_id}`, data, 'delete');
	// 	return res;
	// }

	// // ########################################################
	// // ##################### API ENDPOINTS ####################
	// // ########################################################

	// // GET TRENDING MOVIES
	// static async getTrending() {
	// 	const result = await this.request(`api/trending`);
	// 	return result;
	// }

	// // GET POPULAR MOVIES
	// static async getPopular() {
	// 	const result = await this.request(`api/trending`);
	// 	return result;
	// }

	// // GET MOVIE BY ID
	// static async getById(movie_id) {
	// 	const result = await this.request(`api/${movie_id}`);
	// 	return result;
	// }

	// // GET MOVIE CREDITS BY ID
	// static async getMovieCredits(movie_id) {
	// 	const result = await this.request(`api/credits/${movie_id}`);
	// 	return result;
	// }
}

export default kfshAPI;