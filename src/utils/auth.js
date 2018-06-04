import Cookies from 'js-cookie';
import { addClientPublic, loginWithIdCode, loadUserInformation } from '@/api';

const accessTokenCookie = 'access_token';
const refreshTokenCookie = 'refresh_token';
const cookiesConfiguration = { path: '/' };

export const authStore = {
  user: null
};

function setTokens(accessToken, refreshToken) {
  Cookies.set(accessTokenCookie, accessToken, cookiesConfiguration);
  Cookies.set(refreshTokenCookie, refreshToken, cookiesConfiguration);
}

function removeTokens() {
  Cookies.remove(accessTokenCookie, cookiesConfiguration);
  Cookies.remove(refreshTokenCookie, cookiesConfiguration);
}

function updateUserInformation() {
  return loadUserInformation().then(user => {
    authStore.user = user;
    return user;
  });
}

export const getAccessToken = () => {
  return Cookies.get(accessTokenCookie, cookiesConfiguration);
};
export const getRefreshToken = () => {
  return Cookies.get(refreshTokenCookie, cookiesConfiguration);
};

export const checkLogin = () => {
  return new Promise((resolve, reject) => {
    if (authStore.user) {
      resolve(authStore.user);
    }
    else {
      return updateUserInformation().then(resolve).catch(reject);
    }
  });
};
export const setTokensAndUpdate = (accessToken, refreshToken) => {
  setTokens(accessToken, refreshToken);
  return updateUserInformation();
};
export const doLogout = () => {
  return new Promise((resolve, reject) => {
    removeTokens();
    authStore.user = null;
    reject(Error('Logged out'));
  });
};
export const doLogin = (idCode) => {
  return new Promise((resolve, reject) => {
    return addClientPublic({identificationNumber: idCode})
      .then(clientAdded => {
        return loginWithIdCode(idCode);
      })
      .then(loginResult => {
        console.log('login result', loginResult);
        setTokens(loginResult.access_token, loginResult.refresh_token);
      })
      .then(updateUserInformation)
      .then(resolve).catch(reject);
  });
};
