import http from "k6/http";
 
   const loginUrl = 'https://api.identity-service.main.qa.rib.build/connect/token';
export default function() {
    let createData = {
    
    client_id: 'ribhubshell',
    scope : 'openid profile ccsboa.main.qa rib.project.web rib.tenantmanagement.web rib.entitlementmanagement.web rib.usermanagement.web ribhubshel',
    username: 'serviceuser@yopmail.com',
    password: 'm2OC29D9@n',
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