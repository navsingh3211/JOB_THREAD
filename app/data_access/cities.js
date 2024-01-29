export default function makeCityDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.City.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.City.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...cityInfo }) {
        return docModels.City.create({ ...cityInfo })
    }

    async function insertMany(cities) {
        return docModels.City.insertMany(cities)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.City.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.City.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.City.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.City.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
      const collectionName = await docModels.City.collection.collectionName;
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