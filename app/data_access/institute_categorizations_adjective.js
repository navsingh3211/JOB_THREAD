export default function makeInstituteCategorizationsAdjectiveDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = docModels.InstituteCategorizationsAdjective.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.InstituteCategorizationsAdjective.find(_filter)
        if (select) query.select(select)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.InstituteCategorizationsAdjective.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.InstituteCategorizationsAdjective.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.InstituteCategorizationsAdjective.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.InstituteCategorizationsAdjective.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.InstituteCategorizationsAdjective.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.InstituteCategorizationsAdjective.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
      const collectionName = await docModels.InstituteCategorizationsAdjective
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