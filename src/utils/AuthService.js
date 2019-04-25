import axios from 'axios';
const queryString = require('query-string');

const CLIENT_ID = '307738501047-pnpgrstnfm2r3bmqceptf5mve28sdt3c.apps.googleusercontent.com';
const CLIENT_SECRET = 'Lxff0ic5RSUaPccrOC3ieKZa';
const CLIENT_DOMAIN = 'https://accounts.google.com/o/oauth2/auth';
const ACCESS_TOKEN_URL = 'https://accounts.google.com/o/oauth2/token';
const REDIRECT_URL = 'http://127.0.0.1:3000/auth/google/callback';
const SCOPE = 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.profile';

export const ID_TOKEN_KEY = 'id_token';
export const ACCESS_TOKEN_KEY = 'access_token';
export const EXPIRATION_DATE_KEY = 'expires_in';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const TOKEN_TYPE = 'token_type';

export function login() {
  const payload = {
    'redirect_uri': REDIRECT_URL,
    'client_id': CLIENT_ID,
    'scope': SCOPE,
    'approval_prompt': 'force',
    'access_type': 'offline',
    'response_type': 'code',
  };

  window.location = encodeUrl(CLIENT_DOMAIN, payload);
  // getOauthCode(payload);
}

function getOauthCode(payload) {
  const authWindow = window.open(
    encodeUrl(CLIENT_DOMAIN, payload),
    "windowname1", 'width=800, height=600'
  );

  const pollTimer = window.setInterval(() => {
    try {
      console.log(authWindow.document.URL);
      if (authWindow.document.URL.indexOf(REDIRECT_URL) !== -1) {
        window.clearInterval(pollTimer);
        let url = authWindow.document.URL;
        let urlParams = decodeUrlParams(url);
        console.log(urlParams);
        authWindow.close();
      } else if (authWindow.closed) {
        window.clearInterval(pollTimer);
      }
    } catch(e) {
      console.log('oauth', e);
    }
  }, 100);
}

export function encodeUrl(url, params) {
  const str = [];
  for(let k in params) {
    if (params.hasOwnProperty(k)) {
      let v = params[k];
      str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return url
    ? url + '?' + str.join("&")
    : str.join("&");
}

export function decodeUrlParams(url) {
  let searchString = url.split('?')[1];
  return queryString.parse(searchString);
}

export function getOauthAccessToken(params) {
  return axios({
    url: 'http://127.0.0.1:4000/api/auth/google/callback',
    method: 'get',
    params: params,
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    return Promise.reject(err.response);
  });
}

export function saveOauthCreds(params) {
  setAccessToken(params[ACCESS_TOKEN_KEY]);
  setRefreshToken(params[REFRESH_TOKEN_KEY]);
  setIdToken(params[ID_TOKEN_KEY]);
  setTokenExpirationDate(params[EXPIRATION_DATE_KEY]);
}

export function logout() {
  clearAccessToken();
  clearRefreshToken();
  clearIdToken();
  // browserHistory.push('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

// Get and store access_token in local storage
export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

// Get and store id_token in local storage
export function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function setTokenExpirationDate(expiresIn) {
  const date = new Date();
  date.setSeconds(expiresIn);
  localStorage.setItem(EXPIRATION_DATE_KEY, date);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function getTokenExpirationDate() {
  return localStorage.getItem(EXPIRATION_DATE_KEY);
}

function isTokenExpired() {
  const expirationDate = getTokenExpirationDate();
  return expirationDate < new Date();
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired();
}
