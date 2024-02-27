import http from 'k6/http';
//import { check, sleep } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
const loginUrl = 'https://auth.alpha.rib.build/connect/token';
const userCredentials = open('data.txt').split('\n').map((email) => email.trim());
const password = 'Password@1';

 export function login(username) {
  const createData = {
    client_id: 'carbonquantifier.web',
    scope: 'offline_access carbonquantifier.web',
    username: username,
   password: password,
    grant_type: 'password',
  };
  const loginResponse = http.post(loginUrl, createData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const token = JSON.parse(loginResponse.body).access_token;
console.log('Token is  :', token);
  return JSON.parse(loginResponse.body).access_token;
}
export const options = {
scenarios:{
  contacts:{
    executor:'per-vu-iterations',
    vus:2,
    iterations:1,
    maxDuration: '10s',
  },
},
};


export default function () {
  const user = userCredentials[__VU - 1];
  console.log('current user:', user);
  const bearerToken = login(user);
  const proj_notes = 'Project notes';
  const headers = {
    Authorization: `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };
  
  }