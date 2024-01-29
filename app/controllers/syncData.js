import syncData from "../use_cases/sync-data/index.js"

export default Object.freeze({
    mysqlToMongo: (httpRequest) => syncData.mysqlToMongo(httpRequest),
})