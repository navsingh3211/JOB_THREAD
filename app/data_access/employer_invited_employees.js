export default function makeEmployerInvitedEmployeeDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.EmployerInvitedEmployee.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.EmployerInvitedEmployee.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function aggregate(pipeline = []) {
        return docModels.EmployerInvitedEmployee.aggregate(pipeline)
    }

    async function insert({ ...invitedInfo }) {
        return docModels.EmployerInvitedEmployee.create({ ...invitedInfo })
    }

    async function insertMany(invites) {
        return docModels.EmployerInvitedEmployee.insertMany(invites)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.EmployerInvitedEmployee.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.EmployerInvitedEmployee.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.EmployerInvitedEmployee.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.EmployerInvitedEmployee.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
        const collectionName = await docModels.EmployerInvitedEmployee.collection.collectionName
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