export default function makeSeekerExperienceDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = docModels.SeekerExperience.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.SeekerExperience.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function aggregate(pipeline = []) {
        return docModels.SeekerExperience.aggregate(pipeline)
    }

    async function insert({ ...info }) {
        return docModels.SeekerExperience.create({ ...info })
    }

    async function insertMany(items) {
        return docModels.SeekerExperience.insertMany(items)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.SeekerExperience.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.SeekerExperience.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.SeekerExperience.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        //const project = await sqMmodels.SeekerExperience.findAll({ raw: true, where: _filter, ..._options })
        //return project

        const project = await sqMmodels.SeekerExperience.findAll({
            nest: true,
            //raw: true,
            include: {
                model: sqMmodels.SeekerExperienceSubject, as: 'subjects',
            },
            //group: ['id'],
            where: _filter,
            ..._options
        })

        return JSON.parse(JSON.stringify(project))
    }

    async function dbInfo() {
        const collectionName = await docModels.SeekerExperience.collection.collectionName
        return { collectionName }
    }

    return Object.freeze({
        findOne,
        findAll,
        aggregate,
        insert,
        insertMany,
        updateOne,
        drop,
        findOne_SQ,
        findAll_SQ,
        dbInfo
    })
}