export default function makeEmployerDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.Employer.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.Employer.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.Employer.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.Employer.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.Employer.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.Employer.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.InstitutionCompany.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.InstitutionCompany.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function aggregate(pipeline = []) {
        return docModels.Employer.aggregate(pipeline)
    }

    async function dbInfo() {
      const collectionName = await docModels.Employer.collection.collectionName;
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
        aggregate,
        dbInfo
    })
}