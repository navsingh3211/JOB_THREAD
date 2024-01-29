import { EMPLOYEE_S3VIEW_CDN, PRIORITIES } from '../../../config/index.js'

import {
    instituteCategorizationsRootConfigDB,
    employerDB, employerInstituteDB,
    jobPostDB, jobCategoryDB,
    cacheSearchCandidateResultDB, cacheProbableTitlesDB,
    priorityScoreDB, seekerPreferenceDB
} from '../../../data_access/index.js'
import validators from '../../../validators/employers/find-candidates/index.js';

import makeDomainList from "./domain-list.js"
import makeSuggestionTitles from './suggestion-titles.js'
import makeHiringForJobs from './hiring-for-jobs.js'
import makeJobTypeList from './job-type-list.js'
import makeCandidateList from './candidate-list.js'
import makeCandidateShow from './candidate-show.js'
//import makeCandidateList from './candidate-list-bak-220523.js';
import makeCandidateListRevamp from './candidate-list-revamp.js';
import {
    contactRevealed, preference, seeker, experience, skill,
    saved, invited, applied, shortlisted,
} from "./candidatelist/index.js"

const cases = {
    domainList: makeDomainList({ employerDB, employerInstituteDB }),
    suggestionTitles: makeSuggestionTitles({
        instituteCategorizationsRootConfigDB,
        employerInstituteDB, jobPostDB
    }),
    hiringForJobs: makeHiringForJobs({ employerInstituteDB, jobPostDB }),
    jobTypeList: makeJobTypeList({ jobCategoryDB }),
    candidateList: makeCandidateList({
        validator: validators.searchCandidateValidator,
        employerInstituteDB, cacheSearchCandidateResultDB, cacheProbableTitlesDB, jobPostDB, priorityScoreDB,
        EMPLOYEE_S3VIEW_CDN, PRIORITIES,
        contactRevealed, preference, seeker, experience, skill,
        saved, invited, applied, shortlisted,
    }),
    candidateListRevamp: makeCandidateListRevamp({
        validator: validators.searchCandidateValidator,
        employerInstituteDB, cacheSearchCandidateResultDB, cacheProbableTitlesDB, jobPostDB, priorityScoreDB,
        EMPLOYEE_S3VIEW_CDN, PRIORITIES,
        contactRevealed, preference, seeker, experience, skill,
        saved, invited, applied, shortlisted,
    }),
    candidateShow: makeCandidateShow({ seekerPreferenceDB, EMPLOYEE_S3VIEW_CDN })
}
export default Object.freeze(cases)

export const {
    domainList,
    suggestionTitles,
    hiringForJobs,
    jobTypeList,
    candidateList,
    candidateListRevamp,
    candidateShow
} = cases