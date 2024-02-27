import http from "k6/http";
import { check, sleep } from "k6";
import * as constants from "./common/constants.js";
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';



export let proj_id = "";
export let proj_id1 = "";
export let ServiceProjectID = "";
export let proj_code = "";
export let proj_name = "";
export let proj_address = "";
export let proj_latitude = "";
export let proj_longitude = "";
export let proj_notes = "My Notes";
export let proj_startDate = "";
export let proj_id_list = [];

const loginUrl = 'https://api.identity-service.qa.rib.build/connect/token';
const userCredentials = open('data.txt').split('\n').map((email) => email.trim());
const user = userCredentials[__VU - 1];
const password = 'Password@1';
//console.log(user);


/* export const options = {
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 1,
      maxDuration: '50s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should complete within 1000ms
  },
  
}; */

  /*  export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [         
  
        { duration: '100s', target: 100},
        { duration: '10m', target:100},
        { duration: '100s', target: 0 }
  
            ],
      gracefulRampDown: '60s',
    },
  },
  };      */
  
export default function () {


  let createData = {

    client_id: 'rib.project.web',
    scope: 'openid profile rib.project.web',
    username: `${user}`,
    password: 'Password@1',
    grant_type: 'password'
  };
  let loginResponse = http.post(loginUrl, createData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  
 //sleep(4);
  const Bearer_Token = JSON.parse(loginResponse.body).access_token;

  {
    const headers = {
      Authorization: `Bearer ${Bearer_Token}`,
      "Content-Type": "application/json",
    };

    console.log(Bearer_Token);
    ///////////////////////////////////Project Service API////////////////////////////////

    //1.ValidateProjectName

    let Pname = `ValidatePName${Date.now()}${randomIntBetween(0, 1000)}`;
    let url4 = `${constants.ValidateProjectNameURL}?ProjectName=${Pname}`;

    let res10 = http.get(url4, { headers: headers });

    //console.log(`${res10.url}, Request Body: ${JSON.stringify(res10.request.body)}, Response Body: ${JSON.stringify(res10.body)}`);
    //sleep(4);

    //2.ValidateProjectCode

    let Pcode = `ValidatePCode${Date.now()}${randomIntBetween(0, 1000)}`;
    let url5 = `${constants.ValidateProjectCodeURL}?ProjectCode=${Pcode}`;

    let res11 = http.get(url5, { headers: headers });

    //console.log(`${res11.url}, Request Body: ${JSON.stringify(res11.request.body)}, Response Body: ${JSON.stringify(res11.body)}`);
    //sleep(4);

    //4.GetProjectData

    let res14 = http.get(constants.GetProjectDataURL,
      { headers: headers });

    //console.log(`${res14.url}, Request Body: ${JSON.stringify(res14.request.body)}, Response Body: ${JSON.stringify(res14.body)}`);
    //sleep(2);

    //5.CreateProject

    const data3 = {
      "projectCode": Pcode,
      "projectName": Pname,
      "startDate": "2023-07-28T16:49:54+05:30",
      "endDate": "2023-07-28T16:49:54+05:30",
      "notes": "SProject-1207",
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
      "lastAccessed": "2023-06-28T16:49:54+05:30"
    }
  

    let res15 = http.post(constants.CreateProjectURL, JSON.stringify(data3), { headers: headers, });

    //sleep(8);

    const jsonData15 = JSON.parse(res15.body);


    //sleep(8);

    proj_id = jsonData15.Result.projectId;

    proj_code = jsonData15.Result.projectCode;

    //console.log(`${res15.url}, Request Body: ${JSON.stringify(res15.request.body)}, Response Body: ${JSON.stringify(res15.body)}`);


    //6.GetProjectDetails  

     let res16 = http.get(`${constants.GetProjectDetailsURL}?ProjectId=${proj_id}`, { headers: headers });
     //let res16 = http.get(`${constants.GetProjectDetailsURL}?ProjectId=`, { headers: headers });

   

   // sleep(6);
    

    console.log(`${res16.url}, Request Body: ${JSON.stringify(res16.request.body)}, Response Body: ${JSON.stringify(res16.body)}`); 




    //8.DuplicateProject  

      /*let DuplicatePName = `DuplicatePName${Date.now()}${randomIntBetween(0,1000)}`;
    let DuplicatePcode = `DuplicatePCode${Date.now()}${randomIntBetween(0,1000)}`;
    const data18 = {projectId: proj_id,
    projectCode: DuplicatePcode,
    projectName: DuplicatePName}
    let res18 = http.post(constants.DuplicateProjectURL, JSON.stringify(data18),
    { headers: headers });
    
    const jsonData18 = JSON.parse(res18.body);
    sleep(3);
    proj_id1 = jsonData18.Result.projectId;
   
    console.log(`${res18.url}, Request Body: ${JSON.stringify(res18.request.body)}, Response Body: ${JSON.stringify(res18.body)}`);   */


    //9.RenameProject

    let RenamePName = `RenamePName${Date.now()}${randomIntBetween(0, 1000)}`;
    const data19 =
    {
      projectId: proj_id,
      projectName: RenamePName
    }
    let res19 = http.put(constants.RenameProjectURL, JSON.stringify(data19),
      { headers: headers });
    //sleep(3);
    //console.log(`${res19.url}, Request Body: ${JSON.stringify(res19.request.body)}, Response Body: ${JSON.stringify(res19.body)}`);


    //13.AddOrRemoveFavouriteProject
    const data10 = { projectId: proj_id }
    let res24 = http.put(constants.AddOrRemoveFavouriteProjectURL, JSON.stringify(data10),
      { headers: headers });
    //sleep(3);
    //console.log(`${res24.url}, Request Body: ${JSON.stringify(res24.request.body)}, Response Body: ${JSON.stringify(res24.body)}`);



    //11. Mark Project to Archive

    const data8 = { projectId: proj_id }
    let res21 = http.put(constants.ArchiveProjectURL, JSON.stringify(data8),
      { headers: headers });
   // sleep(2);
    //console.log(`${res21.url}, Request Body: ${JSON.stringify(res21.request.body)}, Response Body: ${JSON.stringify(res21.body)}`);


    //12.UnMark Project from Archive

    const data9 = { projectId: proj_id }
    let res23 = http.put(constants.UnmarkProjectFromArchiveURL, JSON.stringify(data9),
      { headers: headers });
    //sleep(2);
    //console.log(`${res23.url}, Request Body: ${JSON.stringify(res23.request.body)}, Response Body: ${JSON.stringify(res23.body)}`);


    //7.UpdateProject

    let UpdatePname = `UpdatePName${Date.now()}${randomIntBetween(0, 1000)}`;

    const data4 = {
      "projectId": proj_id,
      "projectName": UpdatePname,
      "startDate": "2024-01-18T16:49:54+05:30",
      "endDate": "2024-01-18T16:49:54+05:30",
      "notes": "SProject-1207",
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
      "lastAccessed": "2023-06-28T16:49:54+05:30"
      
    }
    let res17 = http.put(constants.UpdateProjectURL, JSON.stringify(data4), { headers: headers, });
    //sleep(5);
    //console.log(`${res17.url}, Request Body: ${JSON.stringify(res17.request.body)}, Response Body: ${JSON.stringify(res17.body)}`);


    //14. GetColumnData
    let res25 = http.get(`${constants.GetColumnDataURL}?ListType=LandingPageList`, { headers: headers });
    //console.log('GetColumnData URL:', res25);  
    //sleep(3);
    //console.log(`${res25.url}, Request Body: ${JSON.stringify(res25.request.body)}, Response Body: ${JSON.stringify(res25.body)}`);


    //15. CreateOrUpdateColumnData

    const data11 = {
      "columnData": "{\"Starred\":{\"isHidden\":false,\"order\":0},\"projectName\":{\"isHidden\":false,\"order\":1},\"projectCode\":{\"isHidden\":false,\"order\":2},\"tags\":{\"isHidden\":false,\"order\":3},\"status\":{\"isHidden\":false,\"order\":4},\"startDate\":{\"isHidden\":true,\"order\":5},\"endDate\":{\"isHidden\":false,\"order\":7},\"location\":{\"isHidden\":true,\"order\":8}}",
      "listType": "LandingPageList"
    }
    let res26 = http.post(constants.CreateOrUpdateColumnDataURL, JSON.stringify(data11),
      { headers: headers });
    // console.log('CreateOrUpdateColumnData Response is:', res26.body);
   // sleep(3);
   // console.log(`${res26.url}, Request Body: ${JSON.stringify(res26.request.body)}, Response Body: ${JSON.stringify(res26.body)}`);

    //10.GetProjectServiceList

    const data17 = {
      "pageNumber": 1,
      "pageSize": 1

    }
    let res20 = http.post(constants.GetProjectServiceListURL, JSON.stringify(data17), { headers: headers, });

    //sleep(8);
    //const jsonData20 = JSON.parse(res20.body);

    //ServiceProjectID = jsonData20.Result.projectList[0].projectId;

    //console.log(`${res20.url}, Request Body: ${JSON.stringify(res20.request.body)}, Response Body: ${JSON.stringify(res20.body)}`);*/
  } 
  }