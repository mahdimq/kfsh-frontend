
import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

class kfshAPI {
  static async request(endpoint, paramsOrData = {}, verb = 'get') {
    if (!paramsOrData._token) {
      paramsOrData._token = localStorage.getItem('user-token');
    }
    console.debug('API Call:', endpoint, paramsOrData, verb);
    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === 'get' ? 'params' : 'data']: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [ message ];
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

  static async getAllUsers() {
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
  // ##################### VISIT ENDPOINTS ###################
  // ########################################################
  // GET ALL VISITS FOR A SINGLE PATIENT
  static async getVisits(mrn) {
    const result = await this.request(`visits/${mrn}`);
    return result;
  }

  // GET ALL VISITS (LOG BOOK FEATURE)
  static async getAllVisits() {
    const result = await this.request(`visits/`);
    return result;
  }

  // ADD VISIT FOR SINGLE PATIENT
  static async addVisit(mrn, data) {
    const result = await this.request(`visits/${mrn}`, data, 'post');
    return result;
  }

  // ########################################################
  // ################# PHYSICIAN ENDPOINTS ##################
  // ########################################################
  // GET ALL PHYSICIANS
  static async getPhysicians() {
    let res = await this.request(`physicians`);
    return res;
  }

  // ADD PHYSICIAN
  static async addPhysician(data) {
    let res = await this.request(`physicians/`, data, 'post');
    return res;
  }

  // DELETE PHYSICIAN
  static async deletePhysician(id, token) {
    const res = await this.request(`physicians/${id}`, { _token: token }, 'delete');
    return res.message;
  }

  // ########################################################
  // ################## HOSPITAL ENDPOINTS ##################
  // ########################################################
  // GET ALL PROCEDURES
  static async getProcedures() {
    const res = await this.request(`hospital/procedures`);
    return res; 
  }

  // ADD PROCEDURE
  static async addProcedure(data) {
    const res = await this.request(`hospital/procedures/`, data, 'post');
    return res;
  }

  // DELETE PROCEDURE
  static async deleteProcedure(id, token) {
    const res = await this.request(`hospital/procedures/${id}`, {_token: token}, 'delete');
    return res.message;
  }
  // ========================================================
  // GET ALL TEST CODES
  static async getTestCodes() {
    const res = await this.request(`hospital/testcodes`);
    return res; 
  }

  // ADD TEST CODE
  static async addTestCode(data) {
    const res = await this.request(`hospital/testcodes/`, data, 'post');
    return res;
  }

  // DELETE TEST CODE
  static async deleteTestCode(cpt, token) {
    const res = await this.request(`hospital/testcodes/${cpt}`, {_token: token}, 'delete');
    return res.message;
  }

  // ========================================================
  // GET ALL LOCATIONS
  static async getLocations() {
    const res = await this.request(`hospital/locations`);
    return res; 
  }

  // ADD LOCATION
  static async addLocation(data) {
    const res = await this.request(`hospital/locations/`, data, 'post');
    return res;
  }

  // DELETE LOCATION
  static async deleteLocation(id, token) {
    const res = await this.request(`hospital/locations/${id}`, {_token: token}, 'delete');
    return res.message;
  }

  // ========================================================
  // GET ALL DEPARTMENTS
  static async getDepartments() {
    const res = await this.request(`hospital/departments`);
    return res; 
  }

  // ADD DEPARTMENT
  static async addDepartment(data) {
    const res = await this.request(`hospital/departments/`, data, 'post');
    return res;
  }

  // DELETE DEPARTMENT
  static async deleteDepartment(id, token) {
    const res = await this.request(`hospital/departments/${id}`, {_token: token}, 'delete');
    return res.message;
  }

  // ########################################################
  // ################## VISITTEST ENDPOINTS #################
  // ########################################################
  // GET ALL VISITS FOR A SINGLE PATIENT
  static async getVisitDetail(log) {
    const result = await this.request(`visitdetails/${log}`);
    console.log('RESULT IN KFSH VISIT DETAIL: ', result);
    return result;
  }

  static async getVisitDetails() {
    const result = await this.request(`visitdetails/`);
    return result;
  }
  // static async getVisitDetails(mrn) {
  // 	const result = await this.request(`visitdetails/${mrn}`);
  // 	return result;
  // }
}

export default kfshAPI;
