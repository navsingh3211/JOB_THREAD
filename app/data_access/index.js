import * as _sequelizeModels from '../models/sequelize/index.js'
import * as _mongoModels from '../models/mongoose/index.js'
import { sequelize, DataTypes, QueryTypes } from '../config/sequelize.js'
import { COLLECTION_VALUES } from '../config/index.js'

import makeBoardDB from './board.js'
import makeCacheProbableTitlesDB from './cache_probable_titles.js'
import makeCacheSearchCandidateResultDB from './cache_search_candidate_result.js'
import makeCityDB from './cities.js'
import makeCountryDB from './countries.js'
import makeEducationDB from './educations.js'
import makeEducationSpecializationDB from './education_specializations.js'
import makeEmployerDB from './employers.js'
import makeEmployerInstituteDB from './employer_institutes.js'
import makeEmployerInvitedEmployeeDB from './employer_invited_employees.js'
import makeEmployerLoginHistoryDB from './employer_login_history.js'
import makeEmployerSavedEmployeeDB from './employer_saved_employees.js'
import makeEmploymentTypeDB from './employment_types.js'
import makeEmployeeContactRevealedDB from "./employee_contact_revealeds.js"
import makeEmployeeShortlistedDB from "./employee_shortlisted.js";
import makeExperienceDB from './experiences.js'
import makeInstituteCategorizationConfigDB from './institute_categorizations_configs.js'
import makeInstituteCategorizationDB from './institute_categorizations.js'
import makeInstituteCategorizationsAdjectiveDB from './institute_categorizations_adjective.js'
import makeInstituteCategorizationsMapDB from './institute_categorizations_map.js'
import makeInstituteCategorizationsRootConfigDB from './institute_categorizations_root_configs.js'
import makeJobCategoryDB from './job_categories.js'
import makeJobPostDB from './job_posts.js'
import makeJobSeekerDB from './jobseekers.js'
import makeJobTitleSuggestionDB from './job_title_suggestions.js'
import makeLanguageDB from './languages.js'
import makeNoticePeriodDB from './notice_periods.js'
import makePriorityScoreDB from './priority_scores.js'
import makeSeekerAchievementDB from './seeker_achievements.js'
import makeSeekerAppliedJobDB from './seeker_applied_job.js'
import makeSeekerEducationDB from './seeker_educations.js'
import makeSeekerExperienceDB from './seeker_experiences.js'
import makeSeekerLastActiveDB from './seeker_last_active.js'
import makeSeekerLoginHistoryDB from './seeker_login_history.js'
import makeSeekerPreferenceDB from './seeker_preferences.js'
import makeSeekerSkillDB from './seeker_skills.js'
import makeSeekerQualificationDB from './seeker_qualification.js'
import makeSkillDB from './skills.js'

const DB = {
    boardDB: makeBoardDB(_mongoModels, _sequelizeModels),
    cacheProbableTitlesDB: makeCacheProbableTitlesDB(_mongoModels, _sequelizeModels, COLLECTION_VALUES),
    cacheSearchCandidateResultDB: makeCacheSearchCandidateResultDB(_mongoModels, _sequelizeModels),
    cityDB: makeCityDB(_mongoModels, _sequelizeModels),
    countryDB: makeCountryDB(_mongoModels, _sequelizeModels),
    educationDB: makeEducationDB(_mongoModels, _sequelizeModels),
    educationSpecializationDB: makeEducationSpecializationDB(_mongoModels, _sequelizeModels),
    employerDB: makeEmployerDB(_mongoModels, _sequelizeModels),
    employerInstituteDB: makeEmployerInstituteDB(_mongoModels, _sequelizeModels),
    employerInvitedEmployeeDB: makeEmployerInvitedEmployeeDB(_mongoModels, _sequelizeModels),
    employerLoginHistoryDB: makeEmployerLoginHistoryDB({}, _sequelizeModels),
    employerSavedEmployeeDB: makeEmployerSavedEmployeeDB(_mongoModels, _sequelizeModels),
    employmentTypeDB: makeEmploymentTypeDB(_mongoModels, _sequelizeModels),
    employeeContactRevealedDB: makeEmployeeContactRevealedDB(_mongoModels, _sequelizeModels),
    employeeShortlistedDB: makeEmployeeShortlistedDB(_mongoModels, _sequelizeModels),
    experienceDB: makeExperienceDB(_mongoModels, _sequelizeModels),
    instituteCategorizationConfigDB: makeInstituteCategorizationConfigDB(_mongoModels, _sequelizeModels),
    instituteCategorizationDB: makeInstituteCategorizationDB(_mongoModels, _sequelizeModels),
    instituteCategorizationsAdjectiveDB: makeInstituteCategorizationsAdjectiveDB(_mongoModels, _sequelizeModels),
    instituteCategorizationsMapDB: makeInstituteCategorizationsMapDB(_mongoModels, _sequelizeModels),
    instituteCategorizationsRootConfigDB: makeInstituteCategorizationsRootConfigDB(_mongoModels, _sequelizeModels),    
    jobCategoryDB: makeJobCategoryDB(_mongoModels, _sequelizeModels),
    jobPostDB: makeJobPostDB(_mongoModels, _sequelizeModels),
    jobSeekerDB: makeJobSeekerDB(_mongoModels, _sequelizeModels),
    noticePeriodDB: makeNoticePeriodDB(_mongoModels, _sequelizeModels),
    jobTitleSuggestionDB: makeJobTitleSuggestionDB(_mongoModels, _sequelizeModels),
    languageDB: makeLanguageDB(_mongoModels, _sequelizeModels),
    priorityScoreDB: makePriorityScoreDB(_mongoModels, _sequelizeModels),
    seekerAchievementDB: makeSeekerAchievementDB(_mongoModels, _sequelizeModels),
    seekerAppliedJobDB: makeSeekerAppliedJobDB(_mongoModels, _sequelizeModels),
    seekerEducationDB: makeSeekerEducationDB(_mongoModels, _sequelizeModels),
    seekerExperienceDB: makeSeekerExperienceDB(_mongoModels, _sequelizeModels),
    seekerLastActiveDB: makeSeekerLastActiveDB(_mongoModels),
    seekerLoginHistoryDB: makeSeekerLoginHistoryDB({}, _sequelizeModels),
    seekerPreferenceDB: makeSeekerPreferenceDB(_mongoModels, _sequelizeModels),
    seekerQualificationDB: makeSeekerQualificationDB(_mongoModels, _sequelizeModels),
    seekerSkillDB: makeSeekerSkillDB(_mongoModels, _sequelizeModels),
    skillDB: makeSkillDB(_mongoModels, _sequelizeModels),
}

export const {
    boardDB,
    cacheProbableTitlesDB,
    cacheSearchCandidateResultDB,
    cityDB,
    countryDB,
    educationDB,
    educationSpecializationDB,
    employerDB,
    employerInstituteDB,
    employerInvitedEmployeeDB,
    employerLoginHistoryDB,
    employerSavedEmployeeDB,
    employmentTypeDB,
    employeeContactRevealedDB,
    employeeShortlistedDB,
    experienceDB,
    instituteCategorizationConfigDB,
    instituteCategorizationDB,
    instituteCategorizationsAdjectiveDB,
    instituteCategorizationsMapDB,
    instituteCategorizationsRootConfigDB,
    jobCategoryDB,
    jobPostDB,
    jobSeekerDB,
    noticePeriodDB,
    jobTitleSuggestionDB,
    languageDB,
    priorityScoreDB,
    seekerAchievementDB,
    seekerAppliedJobDB,
    seekerEducationDB,
    seekerExperienceDB,
    seekerLastActiveDB,
    seekerLoginHistoryDB,
    seekerPreferenceDB,
    seekerQualificationDB,
    seekerSkillDB,
    skillDB,
} = DB
export default Object.freeze(DB)