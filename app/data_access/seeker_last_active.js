export default function makeSeekerLastActiveDB(docModels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.SeekerLastActive.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.SeekerLastActive.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...info }) {
        return docModels.SeekerLastActive.create({ ...info })
    }

    async function insertMany(items) {
        return docModels.SeekerLastActive.insertMany(items)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.SeekerLastActive.findOneAndUpdate(_filter, update, options);
    }

    async function dbInfo() {
        const collectionName = await docModels.JobCategory.collection.collectionName
        return { collectionName }
    }

    return Object.freeze({
        findOne,
        findAll,
        insert,
        insertMany,
        updateOne,
        dbInfo
    })
}