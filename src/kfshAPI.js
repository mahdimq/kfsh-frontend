import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

class kfshAPI {
	// static async request(endpoint, params = {}, verb = 'get') {
	// 	const _token = localStorage.getItem('user-token');
	// 	console.debug('API Call: ', endpoint, params, verb);
	// 	let q;
	// 	if (verb === 'get') {
	// 		q = axios.get(`${BASE_URL}/${endpoint}`, { params: { _token, ...params } });
	// 	} else if (verb === 'post') {
	// 		q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
	// 	} else if (verb === 'patch') {
	// 		q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
	// 	}

	// 	try {
	// 		return (await q).data;
	// 	} catch (err) {
	// 		console.error('API Error:', err.response);
	// 		let message = err.response.data.message;
	// 		throw Array.isArray(message) ? message : [message];
	// 	}

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
	// ################### MOVIE ENDPOINTS ####################
	// ########################################################

	// static async addMovie(data) {
	// 	let res = await this.request(`movies/add`, data, 'post');
	// 	return res.movie;
	// }

	// static async getMovie(movie_id) {
	// 	let res = await this.request(`movies/${movie_id}`);
	// 	return res.movie;
	// }

	// static async getAllMovies() {
	// 	let res = await this.request(`movies`);
	// 	return res;
	// }

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

// import axios from 'axios';

// const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

// class KFSHApi {
// 	static async request(endpoint, paramsOrData = {}, verb = 'get') {
// 		paramsOrData._token = localStorage.getItem('jobly-token');

// 		console.debug('API Call:', endpoint, paramsOrData, verb);

// 		try {
// 			return (
// 				await axios({
// 					method: verb,
// 					url: `${BASE_URL}/${endpoint}`,
// 					[verb === 'get' ? 'params' : 'data']: paramsOrData
// 				})
// 			).data;
// 			// axios sends query string data via the "params" key,
// 			// and request body data via the "data" key,
// 			// so the key we need depends on the HTTP verb
// 		} catch (err) {
// 			console.error('API Error:', err.response);
// 			let message = err.response.data.message;
// 			throw Array.isArray(message) ? message : [message];
// 		}
// 	}

// 	static async getUser(id) {
// 		let res = await this.request(`users/${id}`);
// 		return res.user;
// 	}

	// static async getCompany(handle) {
	// 	let res = await this.request(`companies/${handle}`);
	// 	return res.company;
	// }

	// static async getJobs(search = {}) {
	// 	let res = await this.request(`jobs`, search);
	// 	return res.jobs;
	// }

	// static async apply(id) {
	// 	let res = await this.request(`jobs/${id}/apply`, {}, 'post');
	// 	return res.message;
	// }

	// static async login(data) {
	// 	let res = await this.request(`login`, data, 'post');
	// 	return res.token;
	// }

	// static async register(data) {
	// 	let res = await this.request(`users`, data, 'post');
	// 	return res.token;
	// }

	// static async getUser(username) {
	// 	let res = await this.request(`users/${username}`);
	// 	return res.user;
	// }

	// static async updateUser(username, data) {
	// 	let res = await this.request(`users/${username}`, data, 'patch');
	// 	return res.user;
	// }
// }

// export default KFSHApi;
