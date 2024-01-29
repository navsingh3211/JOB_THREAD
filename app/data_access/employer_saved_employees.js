export default function makeEmployerSavedEmployeeDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.EmployerSavedEmployee.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.EmployerSavedEmployee.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function aggregate(pipeline = []) {
        return docModels.EmployerSavedEmployee.aggregate(pipeline)
    }

    async function insert({ ...savedInfo }) {
        return docModels.EmployerSavedEmployee.create({ ...savedInfo })
    }

    async function insertMany(saveds) {
        return docModels.EmployerSavedEmployee.insertMany(saveds)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.EmployerSavedEmployee.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.EmployerSavedEmployee.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.EmployerSavedEmployee.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.EmployerSavedEmployee.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
        const collectionName = await docModels.EmployerSavedEmployee.collection.collectionName
        return { collectionName }
    }

    return Object.freeze({
        findOne,
        findAll,
        aggregate,
        insert,
        insertMany,
        updateOne,
        drop,
        findOne_SQ,
        findAll_SQ,
        dbInfo
    })
}