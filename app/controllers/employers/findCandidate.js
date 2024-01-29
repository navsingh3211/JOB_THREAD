import findCandidate from "../../use_cases/employers/find-candidate/index.js"

export default Object.freeze({
    instituteList: (httpRequest) => findCandidate.domainList(httpRequest),
    suggestionTitles: (httpRequest) => findCandidate.suggestionTitles(httpRequest),
    hiringForJobs: (httpRequest) => findCandidate.hiringForJobs(httpRequest),
    jobTypeList: (httpRequest) => findCandidate.jobTypeList(httpRequest),
    candidateList: (httpRequest) => findCandidate.candidateList(httpRequest),
    candidateListRevamp: (httpRequest) => findCandidate.candidateListRevamp(httpRequest),
    candidateShow: (httpRequest) => findCandidate.candidateShow(httpRequest),
})