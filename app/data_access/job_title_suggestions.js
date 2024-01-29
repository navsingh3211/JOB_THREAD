export default function makeJobTitleSuggestionDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = docModels.JobTitleSuggestion.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.JobTitleSuggestion.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...info }) {
        return docModels.JobTitleSuggestion.create({ ...info })
    }

    async function insertMany(items) {
        return docModels.JobTitleSuggestion.insertMany(items)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.JobTitleSuggestion.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.JobTitleSuggestion.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.JobTitleSuggestion.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {

        let project = await sqMmodels.JobTitleSuggestion.findAll({
            raw: true, where: _filter, ..._options,
            group: ['search_keyword'],
            attributes: ['id', 'search_keyword', 'status', 'created_on']
        })

        for (let i = 0; i < project.length; i++) {
            const titles = await sqMmodels.JobTitleSuggestion.findAll({
                raw: true,
                where: { search_keyword: project[i].search_keyword },
                attributes: ['suggested_title']
            })
            project[i].suggested_title = titles.map(a => a.suggested_title)
        }

        return project
    }

    async function dbInfo() {
        const collectionName = await docModels.JobTitleSuggestion.collection.collectionName
        return { collectionName }
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