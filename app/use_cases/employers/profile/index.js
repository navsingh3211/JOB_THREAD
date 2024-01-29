import {
    employerDB, employerInstituteDB,
    cityDB
} from '../../../data_access/index.js'
import makeInstituteList from "./institute-list.js"
import { EMPLOYER_S3VIEW_CDN } from '../../../config/index.js'

const cases = {
    instituteList: makeInstituteList({
        employerDB, employerInstituteDB, cityDB, EMPLOYER_S3VIEW_CDN
    }),
}
export default Object.freeze(cases)

export const {
    instituteList
} = cases