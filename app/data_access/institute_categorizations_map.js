export default function makeInstituteCategorizationsMapDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = await docModels.InstituteCategorizationsMap.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.InstituteCategorizationsMap.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.InstituteCategorizationsMap.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.InstituteCategorizationsMap.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.InstituteCategorizationsMap.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.InstituteCategorizationsMap.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.InstituteCategorizationsMap.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.InstituteCategorizationsMap.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
      const collectionName = await docModels.InstituteCategorizationsMap
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