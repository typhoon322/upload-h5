/* eslint-disable prefer-promise-reject-errors */

import { getToken } from './getLoginInfo';

// 3.0
export const baseUrl = 'http://111.230.249.146:3027';
// export const baseUrl = 'http://192.168.1.100:3027';

const timeoutErr = {
  code: 1,
  msg: '请求超时',
};
const catchErr = {
  code: 1,
  msg: '网络异常',
};

const timeOut = 15;
const requestHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

function timerPromisefy(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timeoutErr);
    }, delay * 1000);
  });
}

export function doPost(path, data) {
  const token = getToken();
  console.log("doGet=> token: ");
  console.log(token);
  return Promise.race([
    timerPromisefy(timeOut),
    new Promise((resolve, reject) => {
      fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
          ...requestHeaders,
          ...(token && { "x-access-token": token })
        },
        // credentials: 'include',
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
        .catch(err => {
          reject(catchErr);
        });
    }),
  ]).then(value => value).catch(err => err);
}

export function doPut(path, data) {
  const token = getToken();
  console.log("doGet=> token: ");
  console.log(token);
  return Promise.race([
    timerPromisefy(timeOut),
    new Promise((resolve, reject) => {
      fetch(`${baseUrl}${path}`, {
        method: "PUT",
        headers: {
          ...requestHeaders,
          ...(token && { "x-access-token": token })
        },
        // credentials: 'include',
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
        .catch(err => {
          reject(catchErr);
        });
    }),
  ]).then(value => value).catch(err => err);
}

export function doGet(path) {
  const token = getToken();
  console.log('doGet=> token: ');
  console.log(token);
  return Promise.race([
    timerPromisefy(timeOut),


    new Promise((resolve, reject) => {
      fetch(`${baseUrl}${path}`, {
        method: "GET",
        headers: {
          ...requestHeaders,
          ...(token && { "x-access-token": token })
        }
        // credentials: 'include',
      })
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
        .catch(err => {
          reject(catchErr);
        });
    }),
  ]).then(value => value).catch(err => err);
}

export function doDelete(path) {
  const token = getToken();
  console.log("doGet=> token: ");
  console.log(token);
  return Promise.race([
    timerPromisefy(timeOut),
    new Promise((resolve, reject) => {
      fetch(`${baseUrl}${path}`, {
        method: "DELETE",
        headers: {
          ...requestHeaders,
          ...(token && { "x-access-token": token })
        }
        // credentials: 'include',
      })
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
        .catch(err => {
          reject(catchErr);
        });
    }),
  ]).then(value => value).catch(err => err);
}
