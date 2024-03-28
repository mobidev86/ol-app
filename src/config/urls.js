/**
 * This is the file used for list of all api's
 */
export const API_BASE_URL = 'http://192.168.1.4:3000/';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;
export const LOGIN_API = getApiUrl('login');
export const PROJECT_LIST_API = getApiUrl('projects');
export const USER_LIST_API = getApiUrl('users');
export const DELETE_PROJECT_BY_ID_API = getApiUrl('projects');
export const DELETE_USER_BY_ID = getApiUrl('users');
export const DASHBOARD_API = getApiUrl('dashboard_cards');
export const SERVER_DETAILS_API = getApiUrl('cpu_report');
export const REPORT_COMMITS_API = getApiUrl('report_commits');
export const RELEASE_RESUME_API = getApiUrl('release_resume');
export const NOTIFICATION_LIST_API = getApiUrl('notification');
