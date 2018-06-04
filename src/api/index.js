import axios from 'axios';
import { getAccessToken, doLogout } from '@/utils/auth';
// TODO this has to be put into configuration file
const BASE_URL = 'http://localhost:9000/api';
const publicHttp = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(
  request => {
    let accessToken = getAccessToken();
    if (accessToken) {
      request.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    else {
      return doLogout();
    }
    return request;
  },
  (error) => Promise.reject(error)
);
http.interceptors.response.use(
  response => {
    if (!response) {
      return null;
    }
    return response.data;
  },
  error => {
    console.log('Error when loading from API', error);
    return Promise.reject(error.response);
  }
);
publicHttp.interceptors.response.use(
  response => {
    if (!response) {
      return null;
    }
    return response.data;
  },
  error => {
    console.log('Error when loading from public API', error);
    return Promise.reject(error.response);
  }
);

export const loginWithIdCode = (idCode) => {
  return publicHttp.post(`/oauth/token`,
    'grant_type=password&username=' + encodeURIComponent(idCode) + '&password=dummy',
    {
      headers: {
        'Authorization': 'Basic ' + btoa('digitalcash-portal:no-secret'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
};

export const loadNorrisJoke = () => publicHttp.get('https://api.chucknorris.io/jokes/random', {baseURL: null, headers: {}});

export const initiateMobileLogin = (idCode, phoneNumber) => publicHttp.post(`/mobile-login`, {idCode: idCode, phoneNumber: phoneNumber});
export const checkMobileLoginStatus = (sessionId) => publicHttp.get(`/mobile-status?session_id=${sessionId}`);
export const addClientPublic = (client) => publicHttp.post(`/clients`, client);
export const loadUserInformation = () => http.get('/me');
export const setBtcAddress = (address) => http.patch(`/clients`, {btcAddress: address});
export const setDashAddress = (address) => http.patch(`/clients`, {dashAddress: address});
export const addClient = (client) => http.post(`/clients`, client);
