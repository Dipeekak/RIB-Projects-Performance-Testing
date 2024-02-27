import http from "k6/http";
 
   const loginUrl = 'https://api.identity-service.qa.rib.build/connect/token';
export default function() {
    let createData = {
    
    client_id: 'rib.project.web',
    scope : 'openid profile rib.project.web',
    username: 'Autoqatest1@yopmail.com',
    password: 'Password@1',
    grant_type: 'password' };
    let loginResponse = http.post(loginUrl, createData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        }      
});
const token = JSON.parse(loginResponse.body).access_token;
console.log('Token is  :', token);
return JSON.parse(loginResponse.body).access_token;
}