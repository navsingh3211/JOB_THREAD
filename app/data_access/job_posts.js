export default function makeJobPostDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = docModels.JobPost.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.JobPost.find(_filter)
        if (select) query.select(select)
        //if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.JobPost.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.JobPost.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.JobPost.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.JobPost.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.JobPost.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        
        let project = await sqMmodels.JobPost.findAll({
            include: [
                { model: sqMmodels.JobPostVacancy, as: 'vacancies' },
                { model: sqMmodels.JobPostSkill, as: 'skills' }
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
        //         skills: x.skills.length && x.skills,
        //         vacancies: x.vacancies.id && x.vacancies,
        //     }
        // })

        return project
    }

    async function aggregate(pipeline = []) {
        return docModels.JobPost.aggregate(pipeline)
    }

    async function preExistingSearchTitles(_filter = {}, _options = {}) {

        const { search, limit, offset } = _options
        const sort = _options.sort ? { ..._options.sort } : { title: 1 }
        const searchQuery = new RegExp(search || '', 'i')

        const query = docModels.JobPost.aggregate([
            { $limit: 1 },
            {
                $facet: {
                    "jobPosts": [
                        {
                            $lookup: {
                                from: "job_posts",
                                pipeline: [
                                    {
                                        $match: {
                                            system_title: { $ne: null },
                                            employer_id: { $ne: null },
                                            is_private: false,
                                            status: { $in: [0, 1, 2] },
                                            end_of_life_date: { $gt: new Date(Date.now()) },
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 0,
                                            title: '$system_title',
                                            job_category: '$job_category',
                                            category: '$institution_cat',
                                            subcategory: '$institution_subcat',
                                            subcategory2: '$institution_subcat2',
                                            role: '$role',
                                            subject: '$subject',
                                        }
                                    }
                                ],
                                as: "jobPosts"
                            }
                        }
                    ],
                    "seekerPreferences": [
                        {
                            $lookup: {
                                from: "seeker_preferences",
                                pipeline: [
                                    {
                                        $match: {
                                            system_title: { $ne: null },
                                            status: 1
                                        }
                                    },
                                    {
                                        $project: {
                                            _id: 0,
                                            title: '$system_title',
                                            job_category: '$job_category',
                                            category: '$institution_cat',
                                            subcategory: '$institution_subcat',
                                            subcategory2: '$institution_subcat2',
                                            role: '$job_role',
                                            subject: '$subject',
                                        }
                                    },
                                ],
                                as: "seekerPreferences"
                            }
                        }
                    ],

                }
            },
            {
                "$project": {
                    "jobPosts": {
                        "$arrayElemAt": ["$jobPosts.jobPosts", 0],
                    },
                    "seekerPreferences": {
                        "$arrayElemAt": ["$seekerPreferences.seekerPreferences", 0],
                    },
                }
            },
            {
                $project: {
                    data: { $setIntersection: ["$jobPosts", "$seekerPreferences"] },
                }
            },
            { $unwind: "$data" },
            { $replaceRoot: { "newRoot": "$data" } },
            { $match: { title: { $regex: searchQuery } } },
            { $match: _filter || {} },
            { $sort: sort },
            { $limit: limit || 5000 },
            { $skip: offset || 0 }
        ])
        return query
    }

    async function dbInfo() {
        const collectionName = await docModels.JobPost.collection.collectionName;
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
        aggregate,
        preExistingSearchTitles,
        dbInfo
    })
}