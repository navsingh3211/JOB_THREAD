import {
    cacheProbableTitlesDB, jobPostDB,
    jobCategoryDB, instituteCategorizationDB,
    instituteCategorizationConfigDB,
    instituteCategorizationsMapDB
} from '../../data_access/index.js'
import makeJobTitleList from "./jobTitleList.js";
import makeJobTypeList from "./jobTypeList.js";
import makeParentTypeList from './parentTypeList.js';
import makeInstitutionHierarchyList from './institutionHierarchyList.js'

const cases = {
    jobTitleList: makeJobTitleList({ cacheProbableTitlesDB, jobPostDB }),
    jobTypeList: makeJobTypeList({ jobCategoryDB }),
    parentTypeList: makeParentTypeList({ instituteCategorizationDB }),
    institutionHierarchyList: makeInstitutionHierarchyList({
        instituteCategorizationDB, instituteCategorizationConfigDB,
        instituteCategorizationsMapDB
    }),
}
export default Object.freeze(cases)

export const {
    jobTitleList,
    jobTypeList,
    parentTypeList,
    institutionHierarchyList
} = cases