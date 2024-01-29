import * as DataAccess from '../data_access/index.js'

const syncMysqlToMongo = async (job) => {

    //console.log('running job ', job.name)
    console.time(`${job.name}`)
    const { collection } = job.data

    if (!DataAccess[collection]) throw Error('Provided db not found')
    if (!DataAccess[collection].findAll_SQ) throw Error(`Feature not available for ${collection} db`)
    if (!DataAccess[collection].insertMany) throw Error(`Feature not available for ${collection} db`)

    const sqData = await DataAccess[collection].findAll_SQ({}, {})
    await DataAccess[collection].drop()
    await DataAccess[collection].insertMany(sqData)
    console.timeEnd(`${job.name}`)
}
export default syncMysqlToMongo