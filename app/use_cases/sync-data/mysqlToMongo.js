export default function makeMysqlToMongo(DataAccess) {

    return async function mysqlToMongo({ body }) {

        const { listDB, db } = body
        if (listDB) return { databases: DataAccess }
        if (!db) throw Error('Provide db name')
        if (!DataAccess[db]) throw Error('Provided db not found')
        if (!DataAccess[db].findAll_SQ) throw Error(`Feature not available for ${db} db`)
        if (!DataAccess[db].insertMany) throw Error(`Feature not available for ${db} db`)

        const sqData = await DataAccess[db].findAll_SQ({}, {})
        await DataAccess[db].drop()
        const docSavedData = await DataAccess[db].insertMany(sqData)

        return {
            message: `Successfully synced MySql to Mongodb ${docSavedData.length || 0} ${db}`
        }
    }
}