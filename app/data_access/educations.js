export default function makeEducationDB(docModels, sqMmodels) {
    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options;
        const query = docModels.Education.findOne(_filter);
        if (select) query.select(select);
        return query.lean().exec();
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.Education.find(_filter);
        if (select) query.select(select);
        if (_options.distinct) query.distinct(_options.distinct);
        if (populate) _.forEach(populate || [], (p) => query.populate(p));
        return query.lean().exec();
    }

    async function insert({ ...educationInfo }) {
        return docModels.Education.create({ ...educationInfo });
    }

    async function insertMany(educations) {
        return docModels.Education.insertMany(educations);
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.Education.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.Education.collection.drop();
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.Education.findOne({ where: _filter });
        return project;
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.Education.findAll({
            raw: true,
            where: _filter,
            ..._options,
        });
        return project;
    }

    async function dbInfo() {
      const collectionName = await docModels.Education.collection
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
    });
}
