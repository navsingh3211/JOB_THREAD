import { EMPLOYEE_S3VIEW_CDN, PRIORITIES } from '../../../config/index.js'

import {
    instituteCategorizationsRootConfigDB,
    employerDB, employerInstituteDB,
    jobPostDB, jobCategoryDB,
    cacheSearchCandidateResultDB, cacheProbableTitlesDB,
    priorityScoreDB,
} from '../../../data_access/index.js'
import validators from '../../../validators/employers/find-candidates/index.js';

import makeDomainList from "./domain-list.js";
import makeSuggestionTitles from './suggestion-titles.js'
import makeHiringForJobs from './hiring-for-jobs.js'
import makeJobTypeList from './job-type-list.js';
import makeCandidateList from './candidate-list.js';
//import makeCandidateList from './candidate-list-bak-220523.js';

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
        EMPLOYEE_S3VIEW_CDN, PRIORITIES
        //validators
    }),
}
export default Object.freeze(cases)

export const {
    domainList,
    suggestionTitles,
    hiringForJobs,
    jobTypeList,
    candidateList,
    candidateListDummy
} = cases