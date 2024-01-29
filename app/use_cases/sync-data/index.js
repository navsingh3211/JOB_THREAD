import * as DataAccess from '../../data_access/index.js'
import makeMysqlToMongo from './mysqlToMongo.js'

const cases = {
    mysqlToMongo: makeMysqlToMongo(DataAccess),
}
export default Object.freeze(cases)

export const {
    mysqlToMongo
} = cases