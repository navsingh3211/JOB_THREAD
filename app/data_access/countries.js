export default function makeCountryDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.Country.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.Country.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...countryInfo }) {
        return docModels.Country.create({ ...countryInfo })
    }

    async function insertMany(countries) {
        return docModels.Country.insertMany(countries)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.Country.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.Country.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.Country.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.Country.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
      const collectionName = await docModels.Country.collection.collectionName;
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