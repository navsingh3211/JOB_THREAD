export default function makeSeekerPreferenceDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.SeekerPreference.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.SeekerPreference.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.SeekerPreference.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.SeekerPreference.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.SeekerPreference.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.SeekerPreference.collection.drop()
    }

    async function aggregate(pipeline = []) {
        return docModels.SeekerPreference.aggregate(pipeline)
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.SeekerPreference.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        //const project = await sqMmodels.SeekerPreference.findAll({ raw: true, where: _filter, ..._options })
        const project = await sqMmodels.SeekerPreference.findAll({
            nest: true,
            //raw: true,
            include: {
                model: sqMmodels.PreferenceLocation, as: 'locations',
                include: {
                    model: sqMmodels.PreferenceLocationCity, as: 'cities'
                }
            },
            //group: ['id'],
            where: _filter,
            ..._options
        })

        return JSON.parse(JSON.stringify(project))
    }

    async function dbInfo() {
        const collectionName = await docModels.SeekerPreference.collection.collectionName
        return { collectionName };
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
    })
}