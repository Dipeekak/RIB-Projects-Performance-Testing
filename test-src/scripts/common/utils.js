import http from 'k6/http';
import { check, sleep } from "k6"; 

//export const loginUrl = 'https://auth.alpha.rib.build/connect/token';
export const baseURL1 = "https://commondataservice-api.dev.rib.build";
export const baseURL2 = "https://projectservice-api.dev.rib.build";
 
export let proj_id = "";
export let proj_code = "";
export let proj_name = "";
export let proj_address = "";
export let proj_latitude = "";
export let proj_longitude = "";
export let proj_notes = "My Notes";
export let proj_startDate = "";
export let proj_id_list = [];

/* export function login() {
     let createData = {
     client_id: 'carbonquantifier.web',
     scope: 'offline_access carbonquantifier.web ',
     username: 'ShrutiB@winjit.com',
     password: 'Shru@9395',
     grant_type: 'password' };
     let loginResponse = http.post(loginUrl, createData, {
     headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
         }  
 });
return JSON.parse(loginResponse.body).access_token;
 } */
/*
 export function CreateProject(Bearer_Token) {
      const headers = {
      Authorization: `Bearer ${Bearer_Token}`,
      "Content-Type": "application/json",
    };  
    let proj_name1 = "proj" + Math.random().toString(32).substring(2);  
    const data1 = {
      projectCode: proj_name1,
      projectName: proj_name1,
      startDate: "2023-01-19T00:00:00.000Z",
      endDate: "2023-01-20T00:00:00.000Z",
      notes: proj_notes,
      address: {
        address: "71907, Drive 350, Hitchcock County, Nebraska, 69043, United States",
        latitude: 36.963939109817986,
        longitude: -102.6820382913837,
        addressDetails: {
          house_number: "71907",
          road: "Drive 350",
          county: "Hitchcock County",
          state: "Nebraska",
          country: "United States",
          postcode: "69043",
        },
      },
      lastAccessed: "2023-01-19T09:55:04.118Z",
    };  
    let res1 = http.post(CreateProjectURL,JSON.stringify(data1),{ headers: headers,});
    const jsonData1 = JSON.parse(res1.body);
    proj_id = jsonData1.Result.id;
    //proj_id = JSON.parse(res1.body).id;
    //console.log('Project Id from Create Project function:', proj_id);
    UpdateProject(proj_id); 
    proj_code = jsonData1.Result.projectCode;
    proj_name = jsonData1.Result.projectName;
    //GetProjectDetails(proj_id);
    //GetNearByProjects(proj_id);
    //GetProjectDetailsforPolling(proj_id);
    //AddOrRemoveFavouriteProject(proj_id)
    //const jsonData2 = JSON.parse(res1.body);
    //proj_code = jsonData2.Result.projectCode;
    //console.log('Project Code :', proj_code);
    //ValidateProjectCode(proj_code);
    //check(res1, { "status is 200": (r) => r.status === 200 });      
    return res1;
  }

 export function GetProjectDetails(Bearer_Token) {
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let res2 = http.get(`${GetProjectDetailsURL}?ProjectId=${proj_id}`,{ headers: headers });
  return res2;
 }
 
 export function UpdateProject(Bearer_Token) {
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  };  
  let proj_name2 = "Updatedproj" + Math.random().toString(32).substring(2);
   //proj_id = 'a0348cc2-a736-4928-8ac4-0e13a6654e1a';
  const data3 = {
    projectId:proj_id,
    projectName: proj_name2,
    projectStartDate: "2023-01-19T00:00:00.000Z",
    projectEndDate: "2023-01-20T00:00:00.000Z",
    projectNotes: "Updated Notes",
    address: {
      address: "346 Main St, Huron, OH 44839",
      latitude: -82.5557369,
      longitude: 41.393529,
      addressDetails: {
        house_number: "UpdatedHouse1103",
        road: "Updated Road Birchwood Dr, Sandusky,",
        // town: "Vani",
        //  village: "vani",
        county: "Updated county Erie County",
        //  city: "Nashik",
        state: "Updated State Canada",
        country: "Updated Country Ontario",
        postcode: "Updated902343",
      },
    },    
  };
  let res3 = http.put(UpdateProjectURL,JSON.stringify(data3),
    { headers: headers});
    //console.log('proj_id from updateproject function:', proj_id);
    return res3;
    }

export function ValidateProjectCode(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let res4 = http.get(`${ValidateProjectCodeURL}?ProjectCode=${proj_code}`,{ headers: headers });
  check(res4, { "status is 200": (r) => r.status === 200 });
  return res4;
}

export function GetNearByProjects(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  const data5 = {
    projectId: proj_id,
    projectIdList: proj_id_list,//[proj_id_list[0], proj_id_list[1]],
    radius: 6500};
    let res5= http.post(GetNearByProjectURL, JSON.stringify(data5),
    { headers: headers });  
    return res5;
}

export function GetProjectDetailsforPolling(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let res6 = http.get(`${GetProjectDetailsforPollingURL}?ProjectId=${proj_id}`, { headers: headers });
  return res6;
}

export function AddOrRemoveFavouriteProject(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  };
  const data7 = {projectId: proj_id,
    projectCode: proj_code}
    let res7 = http.put(AddOrRemoveFavouriteProjectURL, JSON.stringify(data7),
    { headers: headers });
    return res7;
}

export function DeleteProjectTemporary(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  };
  const data8 = {projectId: proj_id,
    projectCode: proj_code}
    let res8 = http.put(DeleteProjectTemporaryURL, JSON.stringify(data8),
    { headers: headers });
    return res8;
}

export function RestoreProject(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  };
  const data9 = {projectId: proj_id}
    let res9 = http.put(RestoreProjectURL, JSON.stringify(data9),
    { headers: headers });
    return res9;
}

export function ValidateProjectName(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  };
  let res10 = http.get(`${ValidateProjectNameURL}?ProjectName=${proj_code}`, { headers: headers });
 return res10;
}

export function GetProjectOrganizerList(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let res11 = http.get(GetProjectOrganizerListURL, 
    { headers: headers });
    return res11;
}

export function GetFavouriteList(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
   let res12 = http.get(GetFavouriteListURL,{ headers: headers });
    return res12;
}

export function GetRecycleBinList(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let res13 = http.get(GetRecycleBinListURL,{ headers: headers });
    return res13;
}

export function RenameProject(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let proj_name3 = "projName" + Math.random().toString(32).substring(2);
  const data14 = {projectId: proj_id,projectName: proj_name3}
  let res14 = http.put(RenameProjectURL, JSON.stringify(data14),
  { headers: headers });
  return res14;
}

export function DuplicateProject(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let proj_name4 = "Duplicate" + Math.random().toString(32).substring(2);
  const data15 = {projectId: proj_id,
  projectCode: proj_name4,
  projectName: proj_name4}
  let res15 = http.post(DuplicateProjectURL, JSON.stringify(data15),
  { headers: headers });
  return res15;
}

export function GetAllCurrencyList(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let res16 = http.get(GetAllCurrencyListURL,
    { headers: headers });
    check(res16, { "status is 200": (r) => r.status === 200 });
    return res16;
}

export function GetAllUnitStandardList(Bearer_Token){
  const headers = {
    Authorization: `Bearer ${Bearer_Token}`,
    "Content-Type": "application/json",
  }; 
  let res17 = http.get(GetAllUnitStandardListURL,{ headers: headers });
    check(res17, { "status is 200": (r) => r.status === 200 });
    return res17;
}
*/