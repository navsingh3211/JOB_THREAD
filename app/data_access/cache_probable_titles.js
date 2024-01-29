export default function makeCacheProbableTitlesDB(
    docModels, sqMmodels, COLLECTION_VALUES
) {

    async function findOne(_filter) {
        const query = docModels.CacheProbableTitle.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.CacheProbableTitle.find(_filter)
        if (select) query.select(select)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.CacheProbableTitle.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.CacheProbableTitle.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.CacheProbableTitle.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.CacheProbableTitle.collection.drop()
    }

    async function aggregate(pipeline = []) {
        return docModels.CacheProbableTitle.aggregate(pipeline)
    }

    async function paginate(_query = {}, _options) {
        const { sort, limit, skip } = _options;
        const query = docModels.CacheProbableTitle.find(_query).sort(sort).skip(skip).limit(limit)
        return query.lean().exec()
    }

    async function findMatchTitles(_filter = {}, _options = {}) {

        const { title } = _filter

        const cpTitle = await docModels.CacheProbableTitle.findOne({ title: title })
        if (!cpTitle) return null
        //console.log(cpTitle)

        let matchedTitles = [{ title: cpTitle.title, rank: 1 }]

        if (cpTitle.job_category === COLLECTION_VALUES.ADMIN && cpTitle.role) {

            const query = await docModels.CacheProbableTitle.aggregate([
                {
                    $match: {
                        job_category: cpTitle.job_category,
                        role: cpTitle.role,
                        _id: { $ne: cpTitle._id }
                    },
                },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        rank: {
                            $cond: [
                                {
                                    $and: [
                                        { $ne: ["$category", null] },
                                        { $eq: ["$category", cpTitle.category] },
                                    ]
                                }, 1, 0
                            ]
                        }
                    }
                },
            ])
            matchedTitles.push(...query)

            const jobTitleSuggestionData = await docModels.JobTitleSuggestion.findOne({
                search_keyword: title,
                status: true
            }).select('-_id suggested_title')

            jobTitleSuggestionData?.suggested_title.forEach(x =>
                !matchedTitles.find(element => element.title === x) && matchedTitles.push({ title: x, rank: 0 })
            )

        } else if (cpTitle.job_category === COLLECTION_VALUES.ACAD) {

            const levels = ['category', 'subcategory', 'subcategory2', 'role', 'subject']

            const catConfigs = await docModels.InstituteCategorizationConfig.find({
                category_id: cpTitle.category, area_of_operation: 5, status: 1
            })

            let levelPositions = { tieBreakers: [], rankLevels: [] }
            for (let i = 0; i < catConfigs.length; i++) {
                levelPositions[catConfigs[i].is_sch_tiebreaker === true ? 'tieBreakers' : 'rankLevels'].push(catConfigs[i].level_position)
            }

            let _filterIMPTitles = {
                job_category: cpTitle.job_category,
                category: cpTitle.category
            }
            levelPositions.tieBreakers.map(x => {
                if (cpTitle[levels[x]] !== null) _filterIMPTitles[levels[x]] = cpTitle[levels[x]]
            })

            let _rankCalcForumula = []
            levelPositions.rankLevels.map(x => {
                _rankCalcForumula.push({ $cond: [{ $eq: [`$${levels[x]}`, cpTitle[levels[x]]] }, x * 100, 0] })
            })

            const query = await docModels.CacheProbableTitle.aggregate([
                { $match: { _id: { $ne: cpTitle._id }, ...(_filterIMPTitles) } },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        rank: { $add: _rankCalcForumula }
                    }
                },
                { $sort: { rank: -1 } }
            ])
            matchedTitles.push(...query)
        }
        return matchedTitles
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.CacheProbableTitle.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.CacheProbableTitle.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    async function dbInfo() {
        const collectionName = await docModels.CacheProbableTitle.collection
            .collectionName;
        return { collectionName: collectionName };
    }


    return Object.freeze({
        findAll,
        findOne,
        insert,
        insertMany,
        updateOne,
        drop,
        aggregate,
        paginate,
        findMatchTitles,
        findOne_SQ,
        findAll_SQ,
        dbInfo
    })
}