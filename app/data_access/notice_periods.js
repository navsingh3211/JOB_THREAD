export default function makeNoticePeriodDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = docModels.NoticePeriod.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.NoticePeriod.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...info }) {
        return docModels.NoticePeriod.create({ ...info })
    }

    async function insertMany(items) {
        return docModels.NoticePeriod.insertMany(items)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.NoticePeriod.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.NoticePeriod.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.NoticePeriod.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.NoticePeriod.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    return Object.freeze({
        findOne,
        findAll,
        insert,
        insertMany,
        updateOne,
        drop,
        findOne_SQ,
        findAll_SQ
    })
}