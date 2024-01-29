export default function makeSeekerSkillDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.SeekerSkill.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.SeekerSkill.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function aggregate(pipeline = []) {
        return docModels.SeekerSkill.aggregate(pipeline)
    }

    async function insert({ ...jobInfo }) {
        return docModels.SeekerSkill.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.SeekerSkill.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.SeekerSkill.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.SeekerSkill.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.SeekerSkill.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.SeekerSkill.findAll({ raw: true, where: _filter, ..._options })
        return project
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
        findAll_SQ
    })
}