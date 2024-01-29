export default function makeEmploymentTypeDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = docModels.EmploymentType.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.EmploymentType.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...info }) {
        return docModels.EmploymentType.create({ ...info })
    }

    async function insertMany(items) {
        return docModels.EmploymentType.insertMany(items)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.EmploymentType.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.EmploymentType.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.EmploymentType.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.EmploymentType.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
      const collectionName = await docModels.EmploymentType.collection
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