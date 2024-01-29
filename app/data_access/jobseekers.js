export default function makeJobSeekerDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.JobSeeker.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options
        const query = docModels.JobSeeker.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function aggregate(pipeline = []) {
        return docModels.JobSeeker.aggregate(pipeline)
    }

    async function insert({ ...jobInfo }) {
        return docModels.JobSeeker.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.JobSeeker.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.JobSeeker.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.JobSeeker.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.JobSeeker.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        //const project = await sqMmodels.JobSeeker.findAll({ raw: true, where: _filter, ..._options })
        let project = await sqMmodels.JobSeeker.findAll({
            include: [
                { model: sqMmodels.SeekerLanguage, as: 'languages' }
            ],
            group: ['id'],
            //raw: true,
            nest: true,
            where: _filter,
            ..._options
        })

        project = JSON.parse(JSON.stringify(project))
        // project = project.map(x => {
        //     return {
        //         ...x,
        //         languages: x.languages.id && x.languages,
        //     }
        // })

        return project
    }

    async function dbInfo() {
        const collectionName = await docModels.JobSeeker.collection.collectionName
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