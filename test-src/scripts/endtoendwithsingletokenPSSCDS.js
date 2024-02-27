import http from "k6/http";
//import "./libs/shim/core.js";
import { check, sleep } from "k6";
import  { login } from './common/utils.js';
import * as constants from "./common/constants.js";
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export let CurrencyID = "";
export let UnitStandardID = "";
export let LanguageID = "";
export let UpdateCurrencyID = "";
export let UpdateUnitStandardID = "";
export let UpdateLanguageID = "";
export let ServiceProjectID = "";
export let ConfigurableID = "";

export let proj_id = "";
export let proj_code = "";
export let proj_name = "";
export let proj_address = "";
export let proj_latitude = "";
export let proj_longitude = "";
export let proj_notes = "My Notes";
export let proj_startDate = "";
export let proj_id_list = [];

/*export const options = {
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '10s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should complete within 1000ms
  },
  ext: {
    loadimpact: {
      distribution: {
        distributionLabel2: { loadZone: 'amazon:de:frankfurt', percent: 100 },
      },
    },
  },
};

  export let options = {
  vus: 100,
   duration: '1s',
 };*/

export const options = {
 
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [                            
        { duration: '120s', target: 100},
        { duration: '120s', target: 300},
        { duration: '120s', target: 500 },
        { duration: '100s', target: 1000 },
        //{ duration: '70s', target: 3000 },
         // { duration: '100s', target: 250 },
         //{ duration: '200s', target: 1000 },
        // { duration: '200s', target: 1000 },
         { duration: '100s', target: 800 },
         //{ duration: '100s', target: 250 }, 
         //{ duration: '60s', target: 1500},
         { duration: '80s', target: 500},
         //{ duration: '120s', target: 200 },
         { duration: '20s', target: 150 },
         { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '30s',
    },
  },
 }; 


export default function (){
   //const Bearer_Token = login(); 
   const Bearer_Token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZGQjJBNjJEODdFMjhCNzA2REZEMTEwNkYxNUEyQzQxMzNBMTg4NTRSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6ImI3S21MWWZpaTNCdF9SRUc4Vm9zUVRPaGlGUSJ9.eyJuYmYiOjE2OTc0NjQzMjYsImV4cCI6MTY5NzQ2NzkyNiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmFscGhhLnJpYi5idWlsZCIsImF1ZCI6WyJjYXJib25xdWFudGlmaWVyLmlkZW50aXR5LmFwaSIsInJpYi5wcm9qZWN0LndlYmFwaSIsImVjMy1pbnRlZ3JhdGlvbi5hcGkiLCJyaWIubWVzc2FnaW5nc2VydmljZS5hcGkiLCJyaWIuc2hhcmVkc2VydmljZXMubWVzc2FnaW5nc2VydmljZS5hcGktZGV2IiwicmliLnNoYXJlZHNlcnZpY2VzLm1lc3NhZ2luZ3NlcnZpY2UuYXBpLXFhIiwicmliLnNoYXJlZHNlcnZpY2VzLm1lc3NhZ2luZ3NlcnZpY2UuYXBpLWFscGhhIiwiaHR0cHM6Ly9hdXRoLmFscGhhLnJpYi5idWlsZC9yZXNvdXJjZXMiXSwiY2xpZW50X2lkIjoiY2FyYm9ucXVhbnRpZmllci53ZWIiLCJzdWIiOiIyMzE0N2ExZS0wYjdlLTRjYmUtYTI0OS03ZDc3NTk5MTVkZGEiLCJhdXRoX3RpbWUiOjE2OTc0NjQzMjYsImlkcCI6ImxvY2FsIiwiZW1haWwiOiJndW5hd2FudC5hdHRhcmRlQHJpYi1zb2Z0d2FyZS5jb20iLCJ1aWQiOiIyMzE0N2ExZS0wYjdlLTRjYmUtYTI0OS03ZDc3NTk5MTVkZGEiLCJmaXJzdF9uYW1lIjoiZ3VuYXdhbnQiLCJsYXN0X25hbWUiOiJhdHRhcmRlIiwib3JnYW5pc2F0aW9uX25hbWUgIjoiV2luaml0IiwiY29udGFjdF9udW1iZXIiOiI5NTYxMTk2ODY0IiwianRpIjoiMkQ5QkZCNUVFQjJCNjAzMDI4RDgxNzQ3MDgyMDRFQkQiLCJpYXQiOjE2OTc0NjQzMjYsInNjb3BlIjpbImNhcmJvbnF1YW50aWZpZXIud2ViIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.hN50QpN8TZ81M2K9vcE4yGzsBw2LLIvvvgIe0Rn8ciMczNKeTGt3ZoWeUeo5xopR6luFH1CLrD-fLzEyyZ2waONBwcq1asQAFI3fzC0d64TBO2IkzHpDuUwPtP-Ll6ZCtt7bSUQbWGbrJqaH8OYyc6Q9z7MpBQQFZ66yR0Ty6IQqMyVwwbxbYvPWvIYQLjmaX5DRLx2sRHrBepILbuZKm-hu6viD5OL8jDLzZI_1cGygi9yQMRAreexU9qBX1TN7o6NkeAQvusWxYBMrBppygoiSmsr8eSSaErD3mGawbtciAhcZkctfyGIdw1ckg4HjD-Gw6BIjm_zqsZE-f9P3Bg'  ;
   {
   const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
   }; 

   ////////////////////////////////CommonDataService API///////////////////////////////

//1. GetAllCurrencyList
  let res1 = http.get(constants.GetAllCurrencyListURL,
  { headers: headers });
  //check(res1, { "status is 200": (r) => r.status === 200 });
  //const jsonData1 = JSON.parse(res1.body);
  //console.log("GetAllCurrencyList Status: "+res1.status+" "+res1.error); 
  //console.log('GetAllCurrencyList Response is:', res1.body);    
  console.log(`${res1.url}, Request Body: ${JSON.stringify(res1.request.body)}, Response Body: ${JSON.stringify(res1.body)}`);

//2. GetAllUnitStandardList
  let res2 = http.get(constants.GetAllUnitStandardListURL,
  { headers: headers });
  //(res2, { "status is 200": (r) => r.status === 200 });
  //const jsonData2 = JSON.parse(res2.body);
  //UnitStandardID = jsonData2.Result[0].unitStandardId;
  //console.log("GetAllUnitStandardList Status: "+res2.status+" "+res2.error);
  //console.log('GetAllUnitStandardList Response is:', res2.body);
  // console.log(jsonData2);
  console.log(`${res2.url}, Request Body: ${JSON.stringify(res2.request.body)}, Response Body: ${JSON.stringify(res2.body)}`);
   
//3. GetAllLanguageList
  
   let res3 =  http.get(constants.GetAllLanguageListURL, { headers: headers });
   //check(res3, { "status is 200": (r) => r.status === 200 });
   //const jsonData3 = JSON.parse(res3.body);
   //console.log("GetAllLanguageList Status: "+res3.status+" "+res3.error);
   //console.log('GetAllLanguageList Response is:', res3.body);
   // console.log(jsonData3);
   console.log(`${res3.url}, Request Body: ${JSON.stringify(res3.request.body)}, Response Body: ${JSON.stringify(res3.body)}`);
   
// //4. GetAllCurrencyListByOrganizationId
  
//   let res4 =  http.get(constants.GetAllCurrencyListByOrganizationIdURL,
//   { headers: headers });
//   check(res4, { "status is 200": (r) => r.status === 200 });
//   const jsonData4 = JSON.parse(res4.body);
//   //console.log("GetAllCurrencyListByOrganizationId Status: "+res4.status+" "+res4.error);
//   //console.log('GetAllCurrencyListByOrganizationId Response is:', res4.body);
//   CurrencyID = jsonData4.Result[0].currencyId;
//   console.log('CurrencyID is  :', CurrencyID); 
//   UpdateCurrencyID = jsonData4.Result[4].currencyId;
//   //console.log('UpdatedCurrencyID is  :', UpdateCurrencyID);
//   // console.log(jsonData4); 
//   console.log(`${res4.url}, Request Body: ${JSON.stringify(res4.request.body)}, Response Body: ${JSON.stringify(res4.body)}`); 

// //5. GetAllUnitStandardListByOrganizationId

//   let res5 =  http.get(constants.GetAllUnitStandardListByOrganizationIdURL,
//   { headers: headers });
//   //check(res5, { "status is 200": (r) => r.status === 200 });
//   const jsonData5 = JSON.parse(res5.body);
//   //console.log("GetAllUnitStandardListByOrganizationId Status: "+res5.status+" "+res5.error);
//   //console.log('GetAllUnitStandardListByOrganizationId Response is:', res5.body);
//   UnitStandardID = jsonData5.Result[0].unitStandardId;
//   //console.log('UnitStandardId is  :', UnitStandardID); 
//   UpdateUnitStandardID = jsonData5.Result[1].unitStandardId;
//   //console.log('UpdatedUnitStandardId is  :', UpdateUnitStandardID); 
//   // console.log(jsonData5);
//   console.log(`${res5.url}, Request Body: ${JSON.stringify(res5.request.body)}, Response Body: ${JSON.stringify(res5.body)}`);  

// //6. GetAllLanguageListByOrganizationId

//   let res6 =  http.get(constants.GetAllLanguageListByOrganizationIdURL,
//   { headers: headers });
//   //check(res6, { "status is 200": (r) => r.status === 200 });
//   const jsonData6 = JSON.parse(res6.body);
//   //console.log("GetAllLanguageListByOrganizationId Status: "+res6.status+" "+res6.error);
//   //console.log('GetAllLanguageListByOrganizationId Response is:', res6.body);
//   LanguageID = jsonData6.Result[3].languageId;
//   //console.log('LanguageId is  :', LanguageID); 
//   UpdateLanguageID = jsonData6.Result[3].languageId;
//   //console.log('UpdateLanguageId is  :', UpdateLanguageID);
//   // console.log(jsonData6);  
//   console.log(`${res6.url}, Request Body: ${JSON.stringify(res6.request.body)}, Response Body: ${JSON.stringify(res6.body)}`);


// //7.GetCurrencyDetailsByCurrencyId

//   let url1 =`${constants.GetCurrencyDetailsByCurrencyIdURL}?CurrencyId=${CurrencyID}`;
//   console.log("Currency URL:", url1);
//   let res7 = http.get(url1, { headers: headers });
//   //check(res7, { "status is 200": (r) => r.status === 200 });
//   //const jsonData7 = JSON.parse(res6.body);
//   //console.log("GetCurrencyDetailsByCurrencyId: "+res7.status+" "+res7.error);
//   //console.log('GetCurrencyDetailsByCurrencyId Response is:', res7.body);
//   // console.log(jsonData7);  
//   console.log(`${res7.url}, Request Body: ${JSON.stringify(res7.request.body)}, Response Body: ${JSON.stringify(res7.body)}`);

// //8.GetUnitStandardDetailsByUnitStandardId

//   let url2 =`${constants.GetUnitStandardDetailsByUnitStandardIdURL}?UnitStandardId=${UnitStandardID}`;
//   //console.log("UnitStandard URL:", url2);
//   let res8 = http.get(url2, { headers: headers });
//   //check(res8, { "status is 200": (r) => r.status === 200 });
//   //const jsonData8 = JSON.parse(res8.body);
//   //console.log("GetUnitStandardDetailsByUnitStandardId: "+res8.status+" "+res8.error);
//   //console.log('GetUnitStandardDetailsByUnitStandardId Response is:', res8.body);
//   //console.log(jsonData8);
//   console.log(`${res8.url}, Request Body: ${JSON.stringify(res8.request.body)}, Response Body: ${JSON.stringify(res8.body)}`);


// //9.GetLanguageDetailsByLanguageId

//   let url3 =`${constants.GetLanguageDetailsByLanguageIdURL}?LanguageId=${LanguageID}`;
//   //console.log("Language URL:", url3);
//   let res9 = http.get(url3, { headers: headers });
//   //check(res9, { "status is 200": (r) => r.status === 200 });
//   //const jsonData9 = JSON.parse(res9.body);
//   //console.log("GetLanguageDetailsByLanguageId: "+res9.status+" "+res9.error);
//   //console.log('GetLanguageDetailsByLanguageId Response is:', res9.body);
//   // console.log(jsonData9);
//   console.log(`${res9.url}, Request Body: ${JSON.stringify(res9.request.body)}, Response Body: ${JSON.stringify(res9.body)}`);


//30.GetCommonDataByIds
 sleep(5);
let url30 =`${constants.GetCommonDataByIdsURL}?UnitStandardId=${UnitStandardID}`;
//console.log("Language URL:", url30);
let res30 = http.get(url30, { headers: headers });
//check(res30, { "status is 200": (r) => r.status === 200 });
//const jsonData30 = JSON.parse(res30.body);
//console.log("GetLanguageDetailsByLanguageId: "+res30.status+" "+res30.error);
//console.log('GetLanguageDetailsByLanguageId Response is:', res30.body);
// console.log(jsonData30);
console.log(`${res30.url}, Request Body: ${JSON.stringify(res30.request.body)}, Response Body: ${JSON.stringify(res30.body)}`);

///////////////////////////////////Project Service API////////////////////////////////
/*
//10.ValidateProjectName

  let Pname = `ValidatePName${Date.now()}${randomIntBetween(0,3000)}`;
  let url4 =`${constants.ValidateProjectNameURL}?ProjectName=${Pname}`;
  //console.log("ValidateProjectName URL:", url4);
  let res10 = http.get(url4, { headers: headers });
  //check(res10, { "status is 200": (r) => r.status === 200 });
  //const jsonData10 = JSON.parse(res10.body);
  //console.log("ValidateProjectName: "+res10.status+" "+res10.error);
  //console.log('ValidateProjectName Response is:', res10.body);
  // console.log(jsonData10);
  console.log(`${res10.url}, Request Body: ${JSON.stringify(res10.request.body)}, Response Body: ${JSON.stringify(res10.body)}`);


//11.ValidateProjectCode
  sleep(5);
  let Pcode = `ValidatePCode${Date.now()}${randomIntBetween(0,3000)}`;
  let url5 =`${constants.ValidateProjectCodeURL}?ProjectCode=${Pcode}`;
  //console.log("ValidateProjectCode URL:", url5);
  let res11 = http.get(url5, { headers: headers });
  //check(res11, { "status is 200": (r) => r.status === 200 });
 // const jsonData11 = JSON.parse(res11.body);
  //console.log("ValidateProjectCode: "+res11.status+" "+res11.error);
  //console.log('ValidateProjectCode Response is:', res11.body);
  // console.log(jsonData11);
  console.log(`${res11.url}, Request Body: ${JSON.stringify(res11.request.body)}, Response Body: ${JSON.stringify(res11.body)}`);


//12.CreateTag
 
  // let tagName = `CreateTag${Date.now()}${randomIntBetween(0,1000)}`;
  // const data1 = {TagName: tagName};
  // let res12 = http.post(constants.CreateTagURL,JSON.stringify(data1),{ headers: headers,});
  // //console.log("CreateTag URL:", url6);
  // //let res12 = http.post(url6, { headers: headers });
  // //check(res12, { "status is 200": (r) => r.status === 200 });
  // //const jsonData12 = JSON.parse(res12.body);
  // //console.log("Createtag: "+res12.status+" "+res12.error);
  // //console.log('CreateTag Response is:', res12.body);
  // // console.log(jsonData12);
  // console.log(`${res12.url}, Request Body: ${JSON.stringify(res12.request.body)}, Response Body: ${JSON.stringify(res12.body)}`);
   
 
//13.ValidateConfigurableCode

  //let tagName = `CreateTag_${Date.now()}__${randomIntBetween(0,1000)}`;
  const data2 = {
  "maxCharacterLength": 6,
  "prefix": "Code",
  "startWith": 4,
  "increment": 5
  };
  let res13 = http.post(constants.ValidateConfigurableCodeURL,JSON.stringify(data2),{ headers: headers,});
  //console.log("CreateTag URL:", url6);
  //let res13 = http.post(url6, { headers: headers });
  //check(res13, { "status is 200": (r) => r.status === 200 });
  const jsonData13 = JSON.parse(res13.body);
  //console.log("ValidateConfigurableCode: "+res13.status+" "+res13.error);
 // console.log('ValidateConfigurableCode:', res13.body);
  // console.log(jsonData13);
  console.log(`${res13.url}, Request Body: ${JSON.stringify(res13.request.body)}, Response Body: ${JSON.stringify(res13.body)}`);


//14.GetProjectData
  sleep(5);
  let res14 = http.get(constants.GetProjectDataURL,
  { headers: headers });
  //check(res14, { "status is 200": (r) => r.status === 200 });
  //const jsonData14 = JSON.parse(res14.body);
  //console.log("GetProjectData: "+res14.status+" "+res14.error);
  //console.log('GetProjectData Response is:', res14.body);
  console.log(`${res14.url}, Request Body: ${JSON.stringify(res14.request.body)}, Response Body: ${JSON.stringify(res14.body)}`);


//15.CreateProject
   const data3 ={
    "projectCode": Pcode,
    "projectName": Pname,
    "clientName": "SProject-1207",
    "startDate": "2023-07-28T16:49:54+05:30", 
    "endDate": "2023-07-28T16:49:54+05:30",
    "notes": "SProject-1207",
    "UnitStandardId": "87c3d0d7-0639-4492-b0cf-fb2872a0f793",
    "unitStandardType": "Metric",
    // "CurrencyId": "fbd7e31d-d176-43fd-b0a0-29a13f436749",
    // "currencyCode": "CAD",
    // "LanguageId": "f12281cc-f428-4c54-9349-a3cec2499f63",
    // "languageName": "French",
    "currencyValue": 50.50,
    "address": {
      "address": "Mumbai-west",
      "latitude": 0,
      "longitude": 0,
      "addressDetails": {
        "houseNumber": "Nashik",
        "road": "Nashik",
        "town": "Nashik",
        "village": "Nashik",
        "city": "Nashik",
        "state": "MH",
        "county": "MH",
        "postcode": "11344",
        "country": "IND"
      }
    },
    "lastAccessed": "2023-06-28T16:49:54+05:30",
  "codes": [
        {
          "codeId": 1,
          "codeName": "Construction Code",
          "currentValue": null,
          "maxCharacterLength": 13,
          "prefix": "DE",
          "numberStartWith": 5,
          "incrementBy": 1,
          "isActive": true
        }
        ],
      "phases": [
        {
          "phaseId": 9,
          "phaseName": "Project Charter Development",
          "parentId": 1,
          "subPhaseCount": 0,
          "isActive": true
        }
      ],
      "tags": [
        {
          "tagId": 1,
          "tagName": "Tag1",
          "isActive": false
        }
      ]
    }
  let res15 = http.post(constants.CreateProjectURL,JSON.stringify(data3),{ headers: headers,}); 
  //console.log('CreateProjectURL:', res15);
  //console.log('Create Project Response is :', res15.body);
  check(res15, { "status is 200": (r) => r.status === 200 });
   const jsonData15 = JSON.parse(res15.body);
  //console.log("Create Project: "+res15.status+" "+res15.error);
  //sleep(5);
  proj_id = jsonData15.Result.projectId;
  //console.log('Project Id is :', proj_id);
  proj_code = jsonData15.Result.projectCode;
  //console.log('Project Code is :', proj_code);
  //console.log('Create Project Response is :', res15.body);
  console.log(`${res15.url}, Request Body: ${JSON.stringify(res15.request.body)}, Response Body: ${JSON.stringify(res15.body)}`);
  sleep(5);

//16.GetProjectDetails  
   
  let res16 = http.get(`${constants.GetProjectDetailsURL}?ProjectId=${proj_id}`,{ headers: headers });
   //console.log('GetProjectDetails URL:', res16);  
  //check(res16, { "status is 200": (r) => r.status === 200 });
  sleep(5);
  const jsonData16 = JSON.parse(res16.body);
  //console.log("GetProjectDetails Status: "+res16.status+" "+res16.error);  
   proj_id = jsonData16.Result.projectId;
  //console.log('Proj_id:', proj_id);
   proj_code = jsonData16.Result.projectCode;
  //console.log('Proj_code', proj_code); 
  //console.log('GetProjectDetails Response is :', res16.body)
  ConfigurableID = jsonData16.Result.codes[0].configurableCodeId;
  //console.log('ConfigurableID is  :', ConfigurableID);
  console.log(`${res16.url}, Request Body: ${JSON.stringify(res16.request.body)}, Response Body: ${JSON.stringify(res16.body)}`);
 


//17.UpdateProject
   let UpdatePname = `UpdatePName${Date.now()}${randomIntBetween(0,1000)}`; 

   const data4 ={
      "projectId": proj_id,
      "projectName": UpdatePname,
      "clientName": "SProject-1207",
      "startDate": "2023-07-28T16:49:54+05:30", 
      "endDate": "2023-07-28T16:49:54+05:30",
      "notes": "SProject-1207",
      "UnitStandardId": "2c54c3da-9279-47ef-8bb0-f64342239490",
      "unitStandardType": "Imperial",
      // "CurrencyId": "c3d74981-ad6a-46ea-9b11-48d647653c41",
      // "currencyCode": "FKP",
      // "LanguageId": "a5191298-c070-4473-8bd9-12aec6368364",
      // "languageName": "Marathi",
      "currencyValue": 50.50,
      "address": {
        "address": "Mumbai-west",
        "latitude": 0,
        "longitude": 0,
        "addressDetails": {
          "houseNumber": "Nashik",
          "road": "Nashik",
          "town": "Nashik",
          "village": "Nashik",
          "city": "Nashik",
          "state": "MH",
          "county": "MH",
          "postcode": "11344",
          "country": "IND"
        }
      },
      "lastAccessed": "2023-06-28T16:49:54+05:30",
    "codes": [
          
          {
            "codeId": 2,
            "codeName": "Estimation Code",
            "currentValue": null,
            "maxCharacterLength": 15,
            "prefix": "ESTC",
            "numberStartWith": 10,
            "incrementBy": 2,
            "isActive": true
          }
                  ],
        "phases": [
          {
            "phaseId": 40,
            "phaseName": "Maintenance and Repairs",
            "parentId": 7,
            "subPhaseCount": 0,
            "isActive": true
          }
        ],
        "tags": [
          {
            "tagId": 4,
            "tagName": "Tag4",
            "isActive": false
          }
        ]
      }
  let res17 = http.put(constants.UpdateProjectURL,JSON.stringify(data4),{ headers: headers,}); 
  //check(res17, { "status is 200": (r) => r.status === 200 });
  //const jsonData17 = JSON.parse(res17.body);
  //console.log("Update Project: "+res17.status+" "+res17.error);
  //console.log('Update Project Response is :', res17.body)
  console.log(`${res17.url}, Request Body: ${JSON.stringify(res17.request.body)}, Response Body: ${JSON.stringify(res17.body)}`);


//18.DuplicateProject  
  sleep(2);
  let DuplicatePName = `DuplicatePName${Date.now()}${randomIntBetween(0,1000)}`;
  let DuplicatePcode = `DuplicatePCode${Date.now()}${randomIntBetween(0,1000)}`;
  const data18 = {projectId: proj_id,
  projectCode: DuplicatePcode,
  projectName: DuplicatePName}
  let res18 = http.post(constants.DuplicateProjectURL, JSON.stringify(data18),
  { headers: headers });
  //check(res18, { "status is 200": (r) => r.status === 200 });
  //console.log("Duplicate Project Status: "+res18.status+" "+res18.error);
  //console.log('Duplicate Project is :', res18.body);
  sleep(5);
  const jsonData18 = JSON.parse(res18.body);
  proj_id = jsonData18.Result.projectId;
  //console.log('Duplicate Project Id is :', proj_id);
  console.log(`${res18.url}, Request Body: ${JSON.stringify(res18.request.body)}, Response Body: ${JSON.stringify(res18.body)}`);



//19.RenameProject
   //sleep(5);
  let RenamePName = `RenamePName${Date.now()}${randomIntBetween(0,1000)}`;
  let RenamePcode = `RenamePCode${Date.now()}${randomIntBetween(0,1000)}`;
  const data19 = {projectId: proj_id,
  projectCode: RenamePcode,
  projectName: RenamePName}
  let res19 = http.put(constants.RenameProjectURL, JSON.stringify(data19),
  { headers: headers });
  //check(res19, { "status is 200": (r) => r.status === 200 });
  //console.log("Rename Project Status: "+res19.status+" "+res19.error);
  //console.log('Rename Project Response is :', res19.body);
  console.log(`${res19.url}, Request Body: ${JSON.stringify(res19.request.body)}, Response Body: ${JSON.stringify(res19.body)}`);



//20.GetProjectServiceList
  
  let res20 = http.get(`${constants.GetProjectServiceListURL}?PageNumber=1&PageSize=3`, { headers: headers });
  check(res20, { "status is 200": (r) => r.status === 200 });
  //console.log("URL:", res20);
  sleep(15);
  const jsonData20 = JSON.parse(res20.body);
  //console.log("GetProjectServiceList Status: " + res20.status + " " + res20.error);
    ServiceProjectID = jsonData20.Result.projectList[0].projectId;
  //sleep(5);
  console.log('ServiceProjectID is  :', ServiceProjectID); 
  console.log(`${res20.url}, Request Body: ${JSON.stringify(res20.request.body)}, Response Body: ${JSON.stringify(res20.body)}`);
  

//21 Mark Project to Archive
  sleep(5);
  const data8 = {projectId: ServiceProjectID}
  let res21 = http.put(constants.ArchiveProjectURL, JSON.stringify(data8),
  { headers: headers });
  //check(res21, { "status is 200": (r) => r.status === 200 });
  //console.log("Mark Project to Archive Status: "+res21.status+" "+res21.error);
  //console.log('Mark Project to Archive Response is :', res21.body);
  console.log(`${res21.url}, Request Body: ${JSON.stringify(res21.request.body)}, Response Body: ${JSON.stringify(res21.body)}`);


//22.GetArchiveProjectList
  sleep(5);
  let res22 = http.get(`${constants.GetArchivedProjectListURL}?PageNumber=1&PageSize=3`, { headers: headers });
  check(res22, { "status is 200": (r) => r.status === 200 });
  //console.log("GetArchivedProjectListURL:", res22);
  //const jsonData22 = JSON.parse(res22.body);
  //console.log("GetArchiveProjectList Status: " + res22.status + " " + res22.error);
  //console.log('GetArchiveProjectList Response is :', res22.body);
  console.log(`${res22.url}, Request Body: ${JSON.stringify(res22.request.body)}, Response Body: ${JSON.stringify(res22.body)}`);


//23.UnMark Project from Archive

  const data9 = {projectId: ServiceProjectID}
  let res23 = http.put(constants.UnmarkProjectFromArchiveURL, JSON.stringify(data9),
  { headers: headers });
  //check(res23, { "status is 200": (r) => r.status === 200 });
  //console.log("UnMark Project from Archive Status: "+res23.status+" "+res23.error);
  //console.log('UnMark Project from Archive Response is :', res23.body);
  console.log(`${res23.url}, Request Body: ${JSON.stringify(res23.request.body)}, Response Body: ${JSON.stringify(res23.body)}`);



//24.AddOrRemoveFavouriteProject
  sleep(5);
  const data10 = {projectId: ServiceProjectID}
  let res24 = http.put(constants.AddOrRemoveFavouriteProjectURL, JSON.stringify(data10),
  { headers: headers });
  //check(res24, { "status is 200": (r) => r.status === 200 });
  const jsonData24 = JSON.parse(res24.body);
  //console.log("AddOrRemoveFavouriteProject: "+res24.status+" "+res24.error);
  //console.log('AddOrRemoveFavouriteProject Response is:', res24.body);
  console.log(`${res24.url}, Request Body: ${JSON.stringify(res24.request.body)}, Response Body: ${JSON.stringify(res24.body)}`);


//25.GetFavouriteProjectList
  sleep(5);
  let res25 = http.get(constants.GetFavouriteListURL, 
  { headers: headers });
  //check(res25, { "status is 200": (r) => r.status === 200 });
  const jsonData25 = JSON.parse(res25.body);
  //console.log(" GetFavouriteProjectList Status: "+res25.status+" "+res25.error);
  //console.log('GetFavouriteProjectList Response is:', res25.body); 
  console.log(`${res25.url}, Request Body: ${JSON.stringify(res25.request.body)}, Response Body: ${JSON.stringify(res25.body)}`);

/*
//26.GenerateConfigurableCodeValue  
  const data11= {configurableCodeId: ConfigurableID}
  let res26 = http.post(constants.GenerateConfigurableCodeValueURL, JSON.stringify(data11),
  { headers: headers });
  //check(res26, { "status is 200": (r) => r.status === 200 });
  // const jsonData26 = JSON.parse(res26.body);
  // console.log("GenerateConfigurableCodeValue: "+res26.status+" "+res26.error);
  //console.log('GenerateConfigurableCodeValueURL Response is:', res26.body);
  console.log(`${res26.url}, Request Body: ${JSON.stringify(res26.request.body)}, Response Body: ${JSON.stringify(res26.body)}`);


//27.GetNearByProject
   
  const data12 = {
  projectId: proj_id,
  projectIdList:[proj_id],
  radius: 0
  };
  let res27= http.post(constants.GetNearByProjectURL, JSON.stringify(data12),
  { headers: headers }
  );
  //check(res27, { "status is 200": (r) => r.status === 200 });
  const jsonData27 = JSON.parse(res27.body);
  //console.log("GetNearbyProjects Status : "+res27.status+" "+res27.error);
  console.log(`${res27.url}, Request Body: ${JSON.stringify(res27.request.body)}, Response Body: ${JSON.stringify(res27.body)}`);
  


//28.GetProjectDetailsforPolling
  let res28 = http.get(`${constants.GetProjectDetailsforPollingURL}?ProjectId=${proj_id}`,{ headers: headers });
  //console.log('GetProjectDetailsforPolling URL:', res16);  
  //check(res28, { "status is 200": (r) => r.status === 200 });
  //const jsonData28 = JSON.parse(res28.body);
  //console.log("GetProjectDetailsforPolling Status: "+res28.status+" "+res28.error);
  console.log(`${res28.url}, Request Body: ${JSON.stringify(res28.request.body)}, Response Body: ${JSON.stringify(res28.body)}`);



//29.AddProjectModuleReference
  const data13 = {
  projectId: proj_id,
  moduleName: "ProjectOrganizer"
  };
   let res29 = http.post(constants.AddProjectModuleReferenceURL, JSON.stringify(data13),
   { headers: headers }
   );
   //check(res29, { "status is 200": (r) => r.status === 200 });
   //const jsonData29 = JSON.parse(res29.body);
   console.log(`${res29.url}, Request Body: ${JSON.stringify(res29.request.body)}, Response Body: ${JSON.stringify(res29.body)}`);

*/}
}
