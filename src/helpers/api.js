import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get list of all companies */

  static async getCompanies() {
    let res = await this.request(`companies/`);
    return res.companies;
  }

  /** Search all companies for given term */

  static async searchCompanies(term) {
    const url = term.length > 0 ? `companies/?nameLike=${term}` : `companies/`;
    let res = await this.request(url);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of all jobs */

  static async getJobs() {
    let res = await this.request(`jobs/`);
    return res.jobs;
  }

  /** Search all jobs for given term */

  static async searchJobs(term) {
    const url = term.length > 0 ? `jobs/?title=${term}` : `jobs/`;
    let res = await this.request(url);
    return res.jobs;
  }

  /** Register new user */

  static async registerNewUser(newUserData) {
    let res = await this.request(`auth/register/`, newUserData, "post");
    this.token = res.token;
    return res.token;
  }

  /** Login user */

  static async loginUser(userData) {
    let res = await this.request(`auth/token/`, userData, "post");
    this.token = res.token;
    return res.token;
  }

  /** Verify password (for user update) */

  static async verifyUser(userData) {
    let res = await this.request(`auth/token/`, userData, "post");
    return "token" in res;
  }

  /** Get user data */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user data */

  static async updateUser(userData) {
    const username = userData.username;
    delete userData.username;
    const res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }

  /** Apply to job */

  static async saveJob(username, jobid) {
    const res = await this.request(
      `users/${username}/jobs/${jobid}`,
      { status: "interested" },
      "post"
    );
    return res.applied;
  }

  /** Get user's job applications */

  static async getApplications(username) {
    const res = await this.request(`users/${username}/jobs`);
    return res.applications;
  }

  /** Update a job application */

  static async updateApp(username, jobid, status) {
    console.log("in update app");
    const res = await this.request(
      `users/${username}/jobs/${jobid}`,
      { status },
      "patch"
    );
    console.log("after API call");
    console.log(res.application);
    return res.application;
  }

  /** Delete job application */

  static async deleteApp(username, jobid) {
    console.log("in delete app");
    const res = await this.request(
      `users/${username}/jobs/${jobid}`,
      {},
      "delete"
    );
    return res.deleted;
  }
}

export default JoblyApi;
