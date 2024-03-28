/**
 * This is the file used for listing of api's
 */
import {
  DASHBOARD_API,
  DELETE_PROJECT_BY_ID_API,
  DELETE_USER_BY_ID,
  LOGIN_API,
  NOTIFICATION_LIST_API,
  PROJECT_LIST_API,
  RELEASE_RESUME_API,
  REPORT_COMMITS_API,
  SERVER_DETAILS_API,
  USER_LIST_API
} from '../config/urls';
import { apiDelete, apiGet } from '../utils/utils';

export function loginApi(query = {}, data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(
      LOGIN_API + `?user=${query?.username}&password=${query?.password}`,
      data,
      headers,
    )
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function projectListApi(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(PROJECT_LIST_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function userListApi(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(USER_LIST_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function deleteProjectByID(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiDelete(DELETE_PROJECT_BY_ID_API + `/${query}`, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function deleteUserByID(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiDelete(DELETE_USER_BY_ID + `/${query}`, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getDashboardData(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(DASHBOARD_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getServerDetails(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(SERVER_DETAILS_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getReportCommits(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(REPORT_COMMITS_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getProjectProgress(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(RELEASE_RESUME_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function getNotificationList(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(NOTIFICATION_LIST_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
