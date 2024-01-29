export default function makeInstituteCategorizationConfigDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = docModels.InstituteCategorizationConfig.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.InstituteCategorizationConfig.find(_filter)
        if (select) query.select(select)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.InstituteCategorizationConfig.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.InstituteCategorizationConfig.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.InstituteCategorizationConfig.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.InstituteCategorizationConfig.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.InstituteCategorizationConfig.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.InstituteCategorizationConfig.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
      const collectionName = await docModels.InstituteCategorizationConfig
        .collection.collectionName;
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