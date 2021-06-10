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
    return res.patient;
  }

  static async getAllPatients() {
    const res = await this.request(`patients`);
    return res;
  }

  static async getPatient(mrn) {
    const res = await this.request(`patients/${mrn}`);
    return res.patient;
  }

  // ########################################################
  // ##################### VISIT ENDPOINTS ###################
  // ########################################################
  // GET ALL VISITS FOR A SINGLE PATIENT
  static async getVisits(log) {
    const result = await this.request(`visits/${log}`);
    return result;
  }

  // GET ALL VISITS (LOG BOOK FEATURE)
  static async getAllVisits() {
    const result = await this.request(`visits/`);
    return result;
  }

  // ADD VISIT FOR SINGLE PATIENT
  static async addVisit(log, data) {
    const result = await this.request(`visits/${log}`, data, 'post');
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
    const res = await this.request(
      `hospital/procedures/${id}`,
      { _token: token },
      'delete'
    );
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
    const res = await this.request(
      `hospital/testcodes/${cpt}`,
      { _token: token },
      'delete'
    );
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
    const res = await this.request(
      `hospital/locations/${id}`,
      { _token: token },
      'delete'
    );
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
    const res = await this.request(
      `hospital/departments/${id}`,
      { _token: token },
      'delete'
    );
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

  // ADD VISIT DETAILS FOR SINGLE PATIENT
  static async addVisitDetail(log, data) {
    const result = await this.request(`visitdetails/${log}`, data, 'post')
    return result;
  }

  // ########################################################
  // ################### QUERIES ENDPOINTS ##################
  // ########################################################
  // GET PROCEDURE REPORTS FOR NPL BY DATE AND AGE
  static async getByDate(data) {
    const result = await this.request(`queries/`, data, 'get');
    return result;
  }

  // GET PROCEDURE REPORTS FOR NPL BY DATE
  static async getNpl(data) {
    const result = await this.request(`queries/npl`, data, 'get');
    return result;
  }

  // GET PROCEDURE REPORTS BY USERS
  static async getByUser(data) {
    const result = await this.request(`queries/user`, data);
    return result;
  }

  // GET PROCEDURE REPORTS BY PHYSICIAN
  static async getByPhysician(data) {
    const result = await this.request(`queries/physician`, data);
    return result;
  }

  // GET PROCEDURE REPORTS BY PHYSICIAN DEPARTMENT
  static async getByDepartment(data) {
    const result = await this.request(`queries/department`,data);
    return result;
  }

  // ########################################################
  // ##################### TEST ENDPOINTS ###################
  // ########################################################
  // GET PROCEDURE REPORTS FOR NPL BY DATE AND AGE
  static async getTestById(id) {
    const result = await this.request(`/visitdetails/test/${id}`, 'get');
    return result;
  }

}

export default kfshAPI;
