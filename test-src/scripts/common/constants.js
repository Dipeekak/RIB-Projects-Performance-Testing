export const loginUrl = 'https://auth.alpha.rib.build/connect/token';
export const baseURL = "http://192.168.0.16:8082";
//export const baseURL1 = "https://commondataservice-api.qa.rib.build";     //QA environment
//export const baseURL2 = "https://projectservice-api.qa.rib.build";       //QA environment

export const baseURL1 = "https://api.commondata.qa.rib.build";   //Dev environment with updated infra
export const baseURL2 = "https://api.project.qa.rib.build";      //Dev environment with updated infra

///////////////////Common DataService/////////////////
export const GetAllUnitStandardListURL = `${baseURL1}/v1/CommonData/GetAllUnitStandardList`;
export const GetAllCurrencyListURL = `${baseURL1}/v1/CommonData/GetAllCurrencyList`;
export const GetAllLanguageListURL = `${baseURL1}/v1/CommonData/GetAllLanguageList`;
export const GetAllCurrencyListByOrganizationIdURL = `${baseURL1}/v1/CommonData/GetAllCurrencyListByOrganizationId`;
export const GetAllUnitStandardListByOrganizationIdURL = `${baseURL1}/v1/CommonData/GetAllUnitStandardListByOrganizationId`;
export const GetAllLanguageListByOrganizationIdURL = `${baseURL1}/v1/CommonData/GetAllLanguageListByOrganizationId`;
export const GetCurrencyDetailsByCurrencyIdURL = `${baseURL1}/v1/CommonData/GetCurrencyDetailsByCurrencyId`;
export const GetUnitStandardDetailsByUnitStandardIdURL = `${baseURL1}/v1/CommonData/GetUnitStandardDetailsByUnitStandardId`;
export const GetLanguageDetailsByLanguageIdURL = `${baseURL1}/v1/CommonData/GetLanguageDetailsByLanguageId`;
export const GetCommonDataByIdsURL = `${baseURL1}/v1/CommonData/GetCommonDataByIds`;


//////////////////Project Service//////////////////////
export const ValidateProjectNameURL = `${baseURL2}/v2/Project/ValidateProjectName`;
export const ValidateProjectCodeURL = `${baseURL2}/v2/Project/ValidateProjectCode`;
export const CreateTagURL = `${baseURL2}/v2/Project/CreateTag`;
export const ValidateConfigurableCodeURL = `${baseURL2}/v2/Project/ValidateConfigurableCode`;
export const GetProjectDataURL = `${baseURL2}/v2/Project/GetProjectData`;
export const CreateProjectURL = `${baseURL2}/v2/Project/CreateProject`;
export const GetProjectDetailsURL = `${baseURL2}/v2/Project/GetProjectDetails`;
export const UpdateProjectURL = `${baseURL2}/v2/Project/UpdateProject`;
export const DuplicateProjectURL = `${baseURL2}/v2/Project/DuplicateProject`;
export const RenameProjectURL = `${baseURL2}/v2/Project/RenameProject`;
export const GetProjectServiceListURL = `${baseURL2}/v2/Project/GetProjectServiceList`;
export const ArchiveProjectURL = `${baseURL2}/v2/Project/MarkProjectToArchive`;
export const GetArchivedProjectListURL = `${baseURL2}/v2/Project/GetArchivedProjectList`;
export const UnmarkProjectFromArchiveURL = `${baseURL2}/v2/Project/UnmarkProjectFromArchive`;
export const AddOrRemoveFavouriteProjectURL = `${baseURL2}/v2/Project/AddOrRemoveFavouriteProject`;
export const GetFavouriteListURL = `${baseURL2}/v2/Project/GetFavouriteProjectList`;
export const GenerateConfigurableCodeValueURL = `${baseURL2}/v2/Project/GenerateConfigurableCodeValue`;
export const CreateOrUpdateColumnDataURL = `${baseURL2}/v2/Project/CreateOrUpdateColumnData`;
export const GetColumnDataURL = `${baseURL2}/v2/Project/GetColumnData`;


