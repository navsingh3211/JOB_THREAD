import search from "../use_cases/search/index.js"

export default Object.freeze({
    jobTitleList: (httpRequest) => search.jobTitleList(httpRequest),
    jobTypeList: (httpRequest) => search.jobTypeList(httpRequest),
    parentTypeList: (httpRequest) => search.parentTypeList(httpRequest),
    institutionHierarchyList: (httpRequest) => search.institutionHierarchyList(httpRequest),
})