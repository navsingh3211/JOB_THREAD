export default function makePriorityScoreDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = docModels.PriorityScore.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.PriorityScore.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...info }) {
        return docModels.PriorityScore.create({ ...info })
    }

    async function insertMany(items) {
        return docModels.PriorityScore.insertMany(items)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.PriorityScore.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.PriorityScore.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.PriorityScore.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.PriorityScore.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
        const collectionName = await docModels.PriorityScore.collection
            .collectionName;
        return { collectionName: collectionName };
    }

    return Object.freeze({
        findOne,
        findAll,
        insert,
        insertMany,
        updateOne,
        drop,
        findOne_SQ,
        findAll_SQ,
        dbInfo
    })
}