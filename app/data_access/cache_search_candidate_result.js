export default function makeCacheSearchCandidateResultDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options;
        const query = docModels.CacheSearchCandidateResult.findOne(_filter);
        if (select) query.select(select);
        return query.lean().exec();
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.CacheSearchCandidateResult.find(_filter);
        if (select) query.select(select);
        if (_options.distinct) query.distinct(_options.distinct);
        if (populate) _.forEach(populate || [], (p) => query.populate(p));
        return query.lean().exec();
    }

    async function insert({ ...cachesearchcandididateresultInfo }) {
        return docModels.CacheSearchCandidateResult.create({
            ...cachesearchcandididateresultInfo,
        });
    }

    async function insertMany(cachesearchcandididateresults) {
        return docModels.CacheSearchCandidateResult.insertMany(
            cachesearchcandididateresults
        );
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.CacheSearchCandidateResult.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.CacheSearchCandidateResult.collection.drop();
    }

    async function aggregate(pipeline = []) {
        return docModels.CacheSearchCandidateResult.aggregate(pipeline)//.explain("executionStats")
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.CacheSearchCandidateResult.findOne({ where: _filter });
        return project;
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.CacheSearchCandidateResult.findAll({
            raw: true,
            where: _filter,
            ..._options,
        });
        return project;
    }

    async function dbInfo() {
        const collectionName = await docModels.CacheSearchCandidateResult
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
        aggregate,
        findOne_SQ,
        findAll_SQ,
        dbInfo
    });
}
