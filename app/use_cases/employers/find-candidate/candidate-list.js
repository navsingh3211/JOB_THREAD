export default function makeCandidateList({
    validator,
    cacheSearchCandidateResultDB, cacheProbableTitlesDB, jobPostDB, priorityScoreDB,
    EMPLOYEE_S3VIEW_CDN, PRIORITIES,
}) {

    return async function candidateList({ query, user: { employerId } }) {

        const request = await validator(query, {})
        //console.log('request ', request)

        const _filter = {
            keyword: request.k || null,
            jobId: request.jid || null,
            cities: request.l || null,
            experience: request.exp || null,
            noticePeriod: request.npd || null,
            salary: request.sal || null,
            employmentType: request.et || null,
            candidateType: request.ct || null,
            education: request.ed || null,
            skills: request.skill || null,
            lastActive: request.la || null,
            resume: request.resume || null,
            workex: request.workex || null,
            priority: request.priority || null,
            page: request.page || 1,
            limit: request.limit || 10,
        }
        _filter.offset = (_filter.page - 1) * _filter.limit
        //console.log(_filter)
        if (!_filter.keyword && !_filter.jobId) throw Error('Keyword or job reference required')

        // -----------
        let isInitSrch = false // initial search
        let isJobSearch = false
        let isTempJob = false
        let matchedTitles = { perfect: [], imperfect: [] }
        const minRequiredVal = {} // min required value of job or filter

        if (_filter.jobId) {
            const jobInfo = await jobPostDB.findOne({ job_id: _filter.jobId, status: { $in: [-1, 1] } })
            if (!jobInfo) throw Error('Invalid job')
            isJobSearch = true
            _filter.jobId = jobInfo.id
            _filter.keyword = jobInfo.system_title
            minRequiredVal.EXP = jobInfo.min_experience
            minRequiredVal.NPD = jobInfo.notice_period
            minRequiredVal.SAL = jobInfo.max_salary
            minRequiredVal.SKL = jobInfo && jobInfo.skills.map(x => x.status && x.skill_id)

            // check is temp/ fake job
            if (jobInfo.is_private && (
                !jobInfo.title || !jobInfo.min_experience || !jobInfo.max_salary ||
                !jobInfo.employment_type || !jobInfo.description || !jobInfo.notice_period ||
                !jobInfo.min_education || !jobInfo.vacancies)
            ) { isTempJob = true }
        }

        const titles = await cacheProbableTitlesDB.findMatchTitles({ title: _filter.keyword })
        if (!titles) throw Error('Title was not found in the system')

        const titleInfo = await cacheProbableTitlesDB.findOne({ title: _filter.keyword })
        const jobCategory = titleInfo.job_category

        //console.time("jscode")
        for (let i = 0; i < titles.length; i++) {
            matchedTitles[titles[i].rank > 0 ? 'perfect' : 'imperfect'].push(titles[i].title)
        }
        //console.timeEnd("jscode")

        if (!_filter.priority) {
            isInitSrch = true
            _filter.priority = PRIORITIES[jobCategory].map(x => x._id)
        }

        const _filterPriorityOrder = [..._filter.priority.keys()].map(x => x + 1)
        const priorityScores = await priorityScoreDB.findAll({ searchpriority: { $in: _filterPriorityOrder } })
        let prioConstScores = {}
        let prioHighScoreTtl = 0
        priorityScores.map((x, i) => {
            prioHighScoreTtl += x.highest
            prioConstScores[_filter.priority[i]] = { highest: x.highest, lowest: x.lowest }
        })

        // console.log('_filterPriorityOrder -> ', _filterPriorityOrder)
        // console.log('prioConstScores -> ', prioConstScores)

        //if (isInitSrch) prioConstScores = { JTL: prioConstScores.JTL } // JTL SCORE
        minRequiredVal.EXP = _filter.experience || minRequiredVal.EXP || 0
        minRequiredVal.NPD = _filter.noticePeriod || minRequiredVal.NPD || 0
        minRequiredVal.NPD = minRequiredVal.NPD > 0 ? (minRequiredVal.NPD - 1) * 15 : minRequiredVal.NPD
        minRequiredVal.SAL = _filter.salary || minRequiredVal.SAL

        const nbExtraSkills = (_filter.skills && minRequiredVal?.SKL) ? _filter.skills.filter(x => !minRequiredVal.SKL.includes(x)).length : 0
        //minRequiredVal.SKL = minRequiredVal?.SKL ? [...new Set([..._filter.skills, ...minRequiredVal.SKL])] : _filter.skills
        //const nbRequiredSkills = [...new Set([...(_filter.skills) || [], ...(minRequiredVal.SKL) || []])].length
        const nbRequiredJobSkills = minRequiredVal?.SKL?.length || 0
        minRequiredVal.SKL = _filter.skills || minRequiredVal.SKL || []

        // console.log('minRequiredVal ', minRequiredVal)
        //console.log('prioConstScores ', prioConstScores)        

        //console.time("aggregate")
        const candidates = await cacheSearchCandidateResultDB.aggregate([
            {
                $match: {
                    ...(((!isJobSearch && _filter.keyword) || isTempJob) && {
                        job_title: { $in: [...matchedTitles.perfect, ...matchedTitles.imperfect] }
                    }),
                    ...(_filter.jobId && { jobpostid: _filter.jobId }),
                },
            },
            {
                $group: {
                    _id: "$seeker_id",
                    preferenceid: { $first: "$preferenceid" },
                    preference_title: { $first: "$preference_title" },
                    //preference_experience: { $first: "$preference_experience" },
                    //priority_searched_for: { $first: "$priority_searched_for" },
                    noticePeriod: { $first: "$preference_notice_period" },
                    JTL_SCORE_: { $first: "$JTL_SCORE" },
                    TOTALSCORE_: { $first: "$TOTALSCORE" },
                }
            },

            { $set: { isPerfectMatch: { $cond: [{ $in: ['$preference_title', matchedTitles.perfect] }, true, false] } } },

            // STAGE::  CONTACT REVEALED >>>>>
            {
                $lookup: {
                    from: "employee_contact_revealeds",
                    localField: "_id",
                    foreignField: "seeker_id",
                    as: "unlocked",
                    pipeline: [
                        {
                            $match: {
                                job_id: _filter.jobId, status: 1,
                                ...(!isJobSearch && { isJobSearch: false }) //⚠️will be added other logic later
                            },
                        },
                        { $limit: 1 },
                        { $project: { _id: 0, id: 1, created_on: 1 } },
                    ],
                }
            }, { $unwind: { path: "$unlocked", preserveNullAndEmptyArrays: true } },
            { $set: { locked: { $cond: ["$unlocked.id", false, true] }, unlockedAt: "$unlocked.created_on" } },
            { $unset: "unlocked" },
            // <<<<< CONTACT REVEALED

            // STAGE::  PREFERENCE >>>>>
            {
                $lookup: {
                    from: "seeker_preferences",
                    localField: "preferenceid",
                    foreignField: "id",
                    as: "pref",
                    pipeline: [
                        { $match: { status: 1 } },

                        {
                            $lookup: {
                                from: "experiences",
                                localField: "experience",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$name", year: { $floor: { $divide: ["$in_months", 12] } } } },
                                ],
                                as: "experience"
                            }
                        }, { $unwind: { path: "$experience", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "employment_types",
                                localField: "employment_type",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$type" } },
                                ],
                                as: "employmentType"
                            }
                        }, { $unwind: { path: "$employmentType", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "cities",
                                localField: "locations.cities.city",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$name" } },
                                ],
                                as: "cities"
                            }
                        },

                        {
                            $project: {
                                _id: 0,
                                experience: 1,
                                employmentType: 1,
                                salary: "$min_salary",
                                title: { $cond: ["$is_customtitle", "$customtitle", "$title"] },
                                cities: 1,
                                matched: { $literal: 74 },
                            }
                        },
                    ],
                },
            },
            { $unwind: "$pref" },
            // <<<<< PREFERENCE

            // STAGE::  JOBSEEKER >>>>>
            {
                $lookup: {
                    from: "jobseekers",
                    let: { "seeker_id": "$_id", "locked": "$locked" },
                    localField: "_id",
                    foreignField: "id",
                    as: "seeker",
                    pipeline: [
                        { $match: { status: true } },

                        {
                            $lookup: {
                                from: "educations",
                                localField: "highest_education",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$type" } },
                                ],
                                as: "education",
                            }
                        }, { $unwind: { path: "$education", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "seeker_educations",
                                localField: "highest_education",
                                foreignField: "education_id",
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$seeker_id', "$$seeker_id"] },
                                                    { $ne: ['$specialization', null] },
                                                    { $eq: ['$status', 1] },
                                                ]
                                            }
                                        }
                                    },
                                    { $project: { _id: 0, specialization: 1 } },
                                ],
                                as: "educationSpec",
                            }
                        }, { $unwind: { path: "$educationSpec", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "education_specializations",
                                localField: "educationSpec.specialization",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, label: "$name" } },
                                ],
                                as: "educationSpec"
                            }
                        }, { $unwind: { path: "$educationSpec", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "seeker_last_active",
                                localField: "id",
                                foreignField: "seeker_id",
                                pipeline: [
                                    { $match: { isDeleted: { $ne: true } } },
                                    { $project: { _id: 0, lastActive: 1, isActive: 1 } },
                                ],
                                as: "lastActiveInfo",
                            }
                        }, { $unwind: { path: "$lastActiveInfo", preserveNullAndEmptyArrays: true } },

                        {
                            $project: {
                                _id: 0,
                                seekerId: "$seekerid",
                                isResume: { $toBool: "$resume" },
                                ...(isJobSearch && {
                                    resume: {
                                        $cond: [
                                            { $ne: ['$resume', null] },
                                            { $concat: [EMPLOYEE_S3VIEW_CDN, "$resume"] },
                                            null
                                        ]
                                    },
                                }),
                                name: {
                                    $cond: [
                                        "$$locked",
                                        "Unlock To View Candidate Name",
                                        { $concat: ["$first_name", " ", "$last_name"] }
                                    ]
                                },
                                pic: {
                                    $cond: [
                                        "$$locked",
                                        { $cond: ["$blurred_photo", { $concat: [EMPLOYEE_S3VIEW_CDN, "$blurred_photo"] }, null] },
                                        { $cond: ["$photo", { $concat: [EMPLOYEE_S3VIEW_CDN, "$photo"] }, null] }
                                    ]
                                },
                                contact: { email: "$email", mobile: "$mobile" },
                                contact: {
                                    $cond: [
                                        "$$locked",
                                        null,
                                        { email: "$email", mobile: "$mobile" }
                                    ]
                                },
                                education: "$education",
                                educationSpec: "$educationSpec.label",
                                isFresher: { $not: "$is_experienced" },
                                lastEdited: "$lastEditedOn",
                                lastActive: {
                                    $cond: [
                                        "$lastActiveInfo",
                                        { $cond: ["$lastActiveInfo.isActive", new Date(), "$lastActiveInfo.lastActive"] },
                                        "$last_active"
                                    ]
                                },
                                //lastActive: { $add: ["$last_active", (5.5 * 60 * 60000)] }, //convertion utc to ist
                            }
                        },
                    ],
                }
            },
            { $unwind: "$seeker" },
            // <<<<< JOBSEEKER           

            // STAGE::  EXPERIENCE >>>>>
            {
                $lookup: {
                    from: "seeker_experiences",
                    localField: "_id",
                    foreignField: "seeker_id",
                    as: "experiences",
                    pipeline: [
                        { $match: { status: 1 } },
                        {
                            $project: {
                                _id: 0,
                                currCo: "$current_company",
                                title: 1,
                                company: "$institute_name"
                            }
                        }
                    ]
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            "$$ROOT",
                            "$seeker",
                            {
                                experiences: {
                                    currCo: {
                                        $filter: {
                                            input: "$experiences", as: "item",
                                            cond: { $eq: ["$$item.currCo", "Yes"] }
                                        }
                                    },
                                    prevCo: {
                                        $filter: {
                                            input: "$experiences", as: "item",
                                            cond: { $eq: ["$$item.currCo", "No"] }
                                        }
                                    }
                                },
                            }
                        ]
                    }
                }
            },

            {
                $set: {
                    workEx: {
                        $cond: {
                            if: { $gt: [{ $size: "$experiences.currCo" }, 1] },
                            then: {
                                nbCurrCo: { $size: "$experiences.currCo" },
                                title: "Working in multiple organisations",
                            },
                            else: {
                                $cond: {
                                    if: { $eq: [{ $size: "$experiences.currCo" }, 1] },
                                    then: {
                                        nbCurrCo: { $size: "$experiences.currCo" },
                                        title: { $last: "$experiences.currCo.title" },
                                        company: { $last: "$experiences.currCo.company" }
                                    },
                                    else: {
                                        nbCurrCo: { $size: "$experiences.currCo" },
                                        title: { $last: "$experiences.prevCo.title" },
                                        company: { $last: "$experiences.prevCo.company" }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            {
                $lookup: {
                    from: "notice_periods",
                    localField: "noticePeriod",
                    foreignField: "day",
                    pipeline: [
                        { $match: { status: true } },
                        { $project: { _id: 0, id: 1, label: "$name", day: 1 } },
                    ],
                    as: "workEx.noticePeriod"
                }
            }, { $unwind: { path: "$workEx.noticePeriod", preserveNullAndEmptyArrays: true } },

            { $unset: ["experiences", "seeker"] },
            // <<<<< EXPERIENCE

            // STAGE::  SKILL >>>>>
            {
                $lookup: {
                    from: "seeker_skills",
                    localField: "_id",
                    foreignField: "seeker_id",
                    as: "skills",
                    pipeline: [
                        { $match: { status: true } },
                        { $project: { _id: 0, id: "$skill_id", label: "$name" } },
                    ],
                }
            },
            // <<<<< SKILL            

            // STAGE::  SAVED >>>>>
            ...(isJobSearch ? [
                {
                    $lookup: {
                        from: "employer_saved_employees",
                        let: { "seeker_id": "$_id" },
                        localField: "preferenceid",
                        foreignField: "seeker_prefId",
                        as: "saved",
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$seeker_id', '$$seeker_id'] },
                                    job_id: _filter.jobId, status: true
                                }
                            },
                            { $limit: 1 },
                            { $project: { _id: 0, id: 1, created_on: 1 } }
                        ]
                    }
                }, { $unwind: { path: "$saved", preserveNullAndEmptyArrays: true } },
            ] : ''),
            // <<<<< SAVED

            // STAGE::  INVITED >>>>>
            ...(isJobSearch ? [
                {
                    $lookup: {
                        from: "employer_invited_employees",
                        let: { "seeker_id": "$_id" },
                        localField: "preferenceid",
                        foreignField: "seeker_prefId",
                        localField: "_id",
                        foreignField: "seeker_id",
                        as: "invited",
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$seeker_id', '$$seeker_id'] },
                                    job_id: _filter.jobId, status: true
                                }
                            },
                            { $limit: 1 },
                            { $project: { _id: 0, id: 1, created_on: 1 } }
                        ]
                    }
                }, { $unwind: { path: "$invited", preserveNullAndEmptyArrays: true } },
            ] : ''),
            // <<<<< INVITED

            // STAGE::  APPLIED >>>>>
            ...(isJobSearch ? [
                {
                    $lookup: {
                        from: "seeker_applied_job",
                        let: { "seeker_id": "$_id" },
                        localField: "preferenceid",
                        foreignField: "preference_id",
                        as: "applied",
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$seeker_id', '$$seeker_id'] },
                                    job_id: _filter.jobId, status: 1
                                }
                            },
                            { $limit: 1 },
                            { $project: { _id: 0, id: 1 } }
                        ]
                    }
                }, { $unwind: { path: "$applied", preserveNullAndEmptyArrays: true } },
            ] : ''),
            // <<<<< APPLIED

            // STAGE::  SHORTLISTED >>>>>
            ...(isJobSearch ? [
                {
                    $lookup: {
                        from: "employee_shortlisted",
                        let: { "seeker_id": "$_id" },
                        localField: "preferenceid",
                        foreignField: "seeker_prefId",
                        as: "shortlisted",
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$seeker_id', '$$seeker_id'] },
                                    job_id: _filter.jobId, status: 1
                                }
                            },
                            { $limit: 1 },
                            { $project: { _id: 0, id: 1 } }
                        ]
                    }
                }, { $unwind: { path: "$shortlisted", preserveNullAndEmptyArrays: true } },
            ] : ''),
            // <<<<< SHORTLISTED

            {
                $set: {
                    isSaved: { $cond: ["$saved.id", true, false] },
                    savedAt: "$saved.created_on",
                    isInvited: { $cond: ["$invited.id", true, false] },
                    invitedAt: "$invited.created_on",
                }
            },

            {
                $set: {
                    ...(isJobSearch ?
                        {
                            isActed: {
                                $cond: [
                                    {
                                        $or: [
                                            { $eq: [false, "$locked"] },
                                            { $eq: [true, "$isSaved"] },
                                            { $eq: [true, "$isInvited"] },
                                            { $gt: [1, "$applied.id"] },
                                            { $gt: [1, "$shortlisted.id"] },
                                        ]
                                    },
                                    true,
                                    false
                                ]
                            }
                        }
                        : { isActed: false }
                    )
                }
            },

            { $unset: ["saved", "invited", "applied", "shortlisted"] },

            { $facet: { data: [{ $match: {} }] } },
            {
                $project: {
                    data: 1,
                    vars: {
                        pref: {
                            experience: {
                                min: { $min: "$data.pref.experience.year" },
                                max: { $max: "$data.pref.experience.year" }
                            },
                            salary: {
                                min: { $min: "$data.pref.salary" },
                                max: { $max: "$data.pref.salary" }
                            }
                        },
                        workEx: {
                            noticePeriod: {
                                min: { $min: "$data.workEx.noticePeriod.day" },
                                max: { $max: "$data.workEx.noticePeriod.day" }
                            }
                        }
                    }
                }
            },
            { $unwind: "$data" },

            // >>>>> SCORE Calculation 🧮
            {
                $set: { "data.JTL_SCORE": { $cond: ["$data.isPerfectMatch", prioConstScores.JTL.highest, prioConstScores.JTL.lowest] } }
            },

            {
                $set: {
                    // LAY_SCORE FORMULA 👉 ROUND(LS + [ (HS - LS) * { (31536000 - X) / 31536000 } ], 2) ↩️
                    // X : seekerActiveInSecondDifference
                    ...(prioConstScores.LAY && {
                        "data.LAY_SCORE": {
                            $round: [
                                {
                                    $add: [
                                        prioConstScores.LAY.lowest,
                                        {
                                            $multiply: [
                                                { $subtract: [prioConstScores.LAY.highest, prioConstScores.LAY.lowest] },
                                                //500,
                                                {
                                                    $divide: [
                                                        {
                                                            $subtract: [
                                                                31536000,
                                                                {
                                                                    $dateDiff:
                                                                    {
                                                                        startDate: "$data.lastActive",
                                                                        endDate: new Date(),
                                                                        unit: "second",
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        31536000
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                2
                            ]
                        },
                    }),
                    ...(prioConstScores.EXP && {
                        "data.EXP_SCORE": {
                            $let: {
                                vars: {
                                    expPercent: {
                                        $cond: [
                                            { $gt: [minRequiredVal.EXP, 0] },
                                            { $divide: [{ $multiply: ["$data.pref.experience.year", 100] }, minRequiredVal.EXP] },
                                            0
                                        ],
                                    },
                                },
                                in: {
                                    $round: [
                                        {
                                            $switch: {
                                                branches: [
                                                    {
                                                        case: { $lt: [minRequiredVal.EXP, 1] },
                                                        //then: "no job or filter experience"
                                                        then: {
                                                            $cond: [
                                                                { $eq: [{ $subtract: ["$vars.pref.experience.max", "$vars.pref.experience.min"] }, 0] },
                                                                prioConstScores.EXP.highest,
                                                                // FORMULA 👉 W = 100 - [(Y-Z) / (Y-X)] * 100
                                                                // FORMULA 👉 LS + [(HS-LS) * (W)] / 100
                                                                {
                                                                    $add: [
                                                                        prioConstScores.EXP.lowest,
                                                                        {
                                                                            $multiply: [
                                                                                (prioConstScores.EXP.highest - prioConstScores.EXP.lowest),
                                                                                {
                                                                                    $divide: [
                                                                                        {
                                                                                            // FORUMULA 👉 W
                                                                                            $subtract: [
                                                                                                100,
                                                                                                {
                                                                                                    $multiply: [
                                                                                                        //(Y-Z) / (Y-X)
                                                                                                        {
                                                                                                            $divide: [
                                                                                                                {
                                                                                                                    $subtract: ["$vars.pref.experience.max", "$data.pref.experience.year"]
                                                                                                                },
                                                                                                                {
                                                                                                                    $subtract: ["$vars.pref.experience.max", "$vars.pref.experience.min"]
                                                                                                                },
                                                                                                            ]
                                                                                                        },
                                                                                                        100
                                                                                                    ]
                                                                                                }
                                                                                            ],
                                                                                        },
                                                                                        100
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    },

                                                    {
                                                        case: { $eq: ["$data.pref.experience.year", null] },
                                                        then: prioConstScores.EXP.lowest
                                                    },
                                                    { case: { $lt: ["$$expPercent", 80] }, then: null },
                                                    {
                                                        case: { $and: [{ $gte: ["$$expPercent", 80] }, { $lt: ["$$expPercent", 100] }] },
                                                        then: prioConstScores.EXP.lowest
                                                    },
                                                    {
                                                        case: { $and: [{ $gte: ["$$expPercent", 100] }, { $lt: ["$$expPercent", 120] }] },
                                                        then: (prioConstScores.EXP.highest * 0.63)
                                                    },
                                                    {
                                                        case: { $and: [{ $gte: ["$$expPercent", 120] }, { $lt: ["$$expPercent", 140] }] },
                                                        then: (prioConstScores.EXP.highest * 0.8)
                                                    },
                                                    {
                                                        case: { $and: [{ $gte: ["$$expPercent", 140] }, { $lt: ["$$expPercent", 160] }] },
                                                        then: prioConstScores.EXP.highest
                                                    },
                                                    {
                                                        case: { $and: [{ $gte: ["$$expPercent", 160] }, { $lt: ["$$expPercent", 180] }] },
                                                        then: (prioConstScores.EXP.highest * 0.8)
                                                    },
                                                    {
                                                        case: { $and: [{ $gte: ["$$expPercent", 180] }, { $lt: ["$$expPercent", 200] }] },
                                                        then: prioConstScores.EXP.lowest
                                                    },
                                                    { case: { $lte: ["$$expPercent", 200] }, then: null },
                                                ],
                                                default: null
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        },
                    }),
                    ...(prioConstScores.NPD && {
                        "data.NPD_SCORE": {
                            $let: {
                                vars: {
                                    npdDiffVal: {
                                        $subtract: [
                                            minRequiredVal.NPD,
                                            { $cond: [{ $eq: ["$data.workEx.noticePeriod.day", 0] }, 30, "$data.workEx.noticePeriod.day"] }
                                        ],
                                    },
                                    seekerNoticePeriod: {
                                        $cond: [{ $eq: ["$data.workEx.noticePeriod.day", 0] }, 30, "$data.workEx.noticePeriod.day"]
                                    }
                                },
                                in: {
                                    $switch: {
                                        branches: [
                                            //{ case: { $lte: ["$$npdDiffVal", -45] }, then: null },
                                            { case: { $eq: ["$$npdDiffVal", -15] }, then: prioConstScores.NPD.lowest },
                                            { case: { $eq: ["$$npdDiffVal", -30] }, then: prioConstScores.NPD.lowest },
                                            { case: { $eq: ["$$npdDiffVal", 0] }, then: (prioConstScores.NPD.highest * 0.71) },
                                            { case: { $eq: ["$$npdDiffVal", 15] }, then: prioConstScores.NPD.highest },
                                            { case: { $eq: ["$$npdDiffVal", 30] }, then: prioConstScores.NPD.lowest },
                                            { case: { $gt: ["$$npdDiffVal", 30] }, then: null },
                                        ],
                                        default: {
                                            $cond: [
                                                { $eq: [{ $subtract: ["$vars.workEx.noticePeriod.max", "$vars.workEx.noticePeriod.min"] }, 0] },
                                                prioConstScores.NPD.highest,
                                                // FORMULA 👉 W = [(Y-Z) / (Y-X)] * 100
                                                // FORMULA 👉 LS + [(HS-LS) * (W)] / 100
                                                {
                                                    $add: [
                                                        prioConstScores.NPD.lowest,
                                                        {
                                                            $divide: [
                                                                {
                                                                    $multiply: [
                                                                        (prioConstScores.NPD.highest - prioConstScores.NPD.lowest),
                                                                        {
                                                                            $divide: [
                                                                                { $subtract: ["$vars.workEx.noticePeriod.max", "$$seekerNoticePeriod"] },
                                                                                { $subtract: ["$vars.workEx.noticePeriod.max", "$vars.workEx.noticePeriod.min"] },
                                                                            ]
                                                                        },
                                                                        100
                                                                    ]
                                                                },
                                                                100
                                                            ]
                                                        }
                                                    ]
                                                },
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                    }),
                    ...(prioConstScores.SAL && {
                        "data.SAL_SCORE": {
                            $let: {
                                vars: {
                                    salPercent: {
                                        $cond: [
                                            { $gt: [minRequiredVal.SAL, 0] },
                                            { $divide: [{ $multiply: ["$data.pref.salary", 100] }, minRequiredVal.SAL] },
                                            0
                                        ],
                                    }
                                },
                                in: {
                                    $round: [
                                        {
                                            $switch: {
                                                branches: [
                                                    {
                                                        case: { $eq: ["$data.pref.salary", 0] }, then: prioConstScores.SAL.lowest
                                                    },
                                                    {
                                                        case: { $lte: [minRequiredVal.SAL, 0] },
                                                        then: {
                                                            $cond: [
                                                                { $eq: [{ $subtract: ["$vars.pref.salary.max", "$vars.pref.salary.min"] }, 0] },
                                                                prioConstScores.SAL.highest,
                                                                // FORMULA 👉 W = [(Y-Z) / (Y-X)] * 100
                                                                // FORMULA 👉 LS + [(HS-LS) * (W)] / 100
                                                                {
                                                                    $add: [
                                                                        prioConstScores.SAL.lowest,
                                                                        {
                                                                            $divide: [
                                                                                {
                                                                                    $multiply: [
                                                                                        (prioConstScores.SAL.highest - prioConstScores.SAL.lowest),
                                                                                        {
                                                                                            $divide: [
                                                                                                { $subtract: ["$vars.pref.salary.max", "$data.pref.salary"] },
                                                                                                { $subtract: ["$vars.pref.salary.max", "$vars.pref.salary.min"] },
                                                                                            ]
                                                                                        },
                                                                                        100
                                                                                    ]
                                                                                },
                                                                                100
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                            ]
                                                        }
                                                    },
                                                    { case: { $lt: ["$$salPercent", 60] }, then: null },
                                                    { case: { $gt: ["$$salPercent", 130] }, then: null },
                                                    {
                                                        case: { $and: [{ $gte: ["$$salPercent", 60] }, { $lt: ["$$salPercent", 80] }] },
                                                        then: prioConstScores.SAL.highest
                                                    },
                                                    {
                                                        case: { $and: [{ $gte: ["$$salPercent", 80] }, { $lt: ["$$salPercent", 100] }] },
                                                        then: (prioConstScores.SAL.highest * 0.71)
                                                    },
                                                    {
                                                        case: { $and: [{ $gte: ["$$salPercent", 100] }, { $lt: ["$$salPercent", 130] }] },
                                                        then: prioConstScores.SAL.lowest
                                                    },
                                                ],
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        },
                    }),
                    ...(prioConstScores.SKL && {
                        "data.SKL_SCORE": {
                            $let: {
                                vars: {
                                    nbMatchedSkills: { $size: { $setIntersection: [minRequiredVal.SKL, "$data.skills.id"] } },
                                },
                                in: {
                                    $cond: {
                                        if: { $or: [_filter.skills, nbRequiredJobSkills] },
                                        then: {
                                            // FORMULA 👉LS + [(nbMatchedSkills / (nbUnmatchedSkills + nbExtraSkills + nbMatchedSkills) )* (HS - LS)]
                                            $add: [
                                                prioConstScores.SKL.lowest,
                                                {
                                                    $multiply: [
                                                        {
                                                            $divide: [
                                                                "$$nbMatchedSkills",
                                                                {
                                                                    $cond: [
                                                                        {
                                                                            $lt: [
                                                                                {
                                                                                    $add: [
                                                                                        { $subtract: [nbRequiredJobSkills, "$$nbMatchedSkills"] },
                                                                                        nbExtraSkills,
                                                                                        "$$nbMatchedSkills"
                                                                                    ]
                                                                                },
                                                                                1
                                                                            ]
                                                                        },
                                                                        1,
                                                                        {
                                                                            $add: [
                                                                                { $subtract: [nbRequiredJobSkills, "$$nbMatchedSkills"] },
                                                                                nbExtraSkills,
                                                                                "$$nbMatchedSkills"
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        (prioConstScores.SKL.highest - prioConstScores.SKL.lowest)
                                                    ]
                                                }
                                            ]
                                        },
                                        else: {
                                            $cond: [
                                                isJobSearch,
                                                {
                                                    // FORMULA 👉 (nbMatchedSkills / nbRequiredSkills) * HS
                                                    $multiply: [
                                                        { $cond: [{ $lt: [nbRequiredJobSkills, 1] }, 0, { $divide: ["$$nbMatchedSkills", nbRequiredJobSkills] }] },
                                                        prioConstScores.SKL.highest
                                                    ]
                                                },
                                                //0
                                                prioConstScores.SKL.lowest
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }),
                },
            },

            {
                $set: { "data.TOTALSCORE_2": { $subtract: [{ $add: ["$data.TOTALSCORE_", "$data.JTL_SCORE"] }, "$data.JTL_SCORE_"] } }
            },

            {
                $set: {
                    "data.TOTALSCORE": {
                        $add: [
                            { $ifNull: ["$data.JTL_SCORE", 0] },
                            { $ifNull: ["$data.LAY_SCORE", 0] },
                            { $ifNull: ["$data.EXP_SCORE", 0] },
                            //{ $add: [{ $ifNull: ["$data.NPD_SCORE", 0] }, 5000] },
                            { $ifNull: ["$data.NPD_SCORE", 0] },
                            { $ifNull: ["$data.SAL_SCORE", 0] },
                            { $ifNull: ["$data.SKL_SCORE", 0] },
                        ]
                    }
                }
            },

            {
                $set: { "data.MATCH_DELTA": { $multiply: [{ $divide: ["$data.TOTALSCORE", prioHighScoreTtl] }, 100] } }
            },
            {
                $set: { "data.MATCH_PERCENTAGE": { $round: ["$data.MATCH_DELTA", 0] } }
            },
            { $set: { "data.pref.matched": "$data.MATCH_PERCENTAGE" } },
            // <<<< SCORE Calculation

            { $group: { _id: "$data" } },
            { $replaceRoot: { newRoot: "$$ROOT._id" } },

            //  FILTER >>>>>
            {
                $match: {
                    ...(_filter.experience && { "pref.experience.year": { $gte: _filter.experience } }),
                    ...(_filter.employmentType && { "pref.employmentType.id": _filter.employmentType }),
                    ...(_filter.cities && { "pref.cities.id": { $in: _filter.cities } }),
                    ...(_filter.salary && {
                        "pref.salary": { $gte: (_filter.salary * (60 / 100)), $lte: (_filter.salary * (130 / 100)) }
                    }),
                    ...(_filter.education && { "education.id": _filter.education }),
                    ...(_filter.resume && { "isResume": _filter.resume === 1 ? true : false }),
                    ...(_filter.noticePeriod && { "workEx.noticePeriod.day": { $lte: _filter.noticePeriod } }),
                    ...(_filter.skills && { "skills.id": { $in: _filter.skills } }),
                    ...((_filter.candidateType === 1 || _filter.candidateType === 2) && {
                        "isActed": _filter.candidateType === 1 ? false : true
                    }),
                }
            },
            // <<<<<

            { $sort: { "pref.matched": -1 } },

            // FACET:: CANDIDATES & CLUSTORS >>>>>
            {
                $facet: {
                    noticePeriods: [
                        { $unwind: "$workEx" },
                        {
                            $group: {
                                _id: "$workEx.noticePeriod.id",
                                day: { $first: "$workEx.noticePeriod.day" },
                                label: { $first: "$workEx.noticePeriod.label" },
                                count: { $sum: 1 }
                            }
                        }, { $sort: { count: -1 } }
                    ],
                    experiences: [
                        { $unwind: "$pref.experience" },
                        {
                            $group: {
                                _id: "$pref.experience.id",
                                label: { $first: "$pref.experience.label" },
                                count: { $sum: 1 },
                                year: { $first: "$pref.experience.year" }
                            }
                        }, { $sort: { count: -1 } }
                    ],
                    employmentTypes: [
                        { $unwind: "$pref.employmentType" },
                        {
                            $group: {
                                _id: "$pref.employmentType.id",
                                label: { $first: "$pref.employmentType.label" },
                                count: { $sum: 1 },
                            }
                        }, { $sort: { count: -1 } }
                    ],
                    cities: [
                        { $unwind: "$pref.cities" },
                        {
                            $group: {
                                _id: "$pref.cities.id",
                                label: { $first: "$pref.cities.label" },
                                count: { $sum: 1 },
                            }
                        }, { $sort: { count: -1 } }
                    ],
                    educations: [
                        { $unwind: "$education" },
                        {
                            $group: {
                                _id: "$education.id",
                                label: { $first: "$education.label" },
                                count: { $sum: 1 },
                            }
                        }, { $sort: { count: -1 } }
                    ],
                    skills: [
                        { $unwind: "$skills" },
                        {
                            $group: {
                                _id: "$skills.id",
                                label: { $first: "$skills.label" },
                                count: { $sum: 1 },
                            }
                        }, { $sort: { count: -1 } }
                    ],
                    prefMinSalary: [
                        { $sort: { "pref.salary": 1 } }, { $limit: 1 },
                        { $project: { _id: 0, salary: "$pref.salary" } },
                    ],
                    prefMaxSalary: [
                        { $sort: { "pref.salary": -1 } }, { $limit: 1 },
                        { $project: { _id: 0, salary: "$pref.salary" } },
                    ],
                    meta: [{ $count: "total" }],
                    candidates: [
                        { $skip: _filter.offset },
                        { $limit: _filter.limit },
                        {
                            $replaceRoot: {
                                newRoot: {
                                    $mergeObjects: [
                                        "$$ROOT",
                                        {
                                            education: "$education.label",
                                            pref: {
                                                $mergeObjects: [
                                                    "$pref",
                                                    {
                                                        employmentType: "$pref.employmentType.label",
                                                        experience: "$pref.experience.label",
                                                        cities: "$pref.cities.label"
                                                    }
                                                ]
                                            },
                                            workEx: {
                                                $cond: {
                                                    if: { $ne: [null, "$workEx"] },
                                                    then: {
                                                        $mergeObjects: ["$workEx", { noticePeriod: "$workEx.noticePeriod.day" }]
                                                    }, else: "$workEx"
                                                }
                                            },
                                            skills: "$skills.label",
                                        }
                                    ]
                                }
                            }
                        },
                    ]
                }
            },
            // <<<<< FACET <<- CANDIDATES & CLUSTORS     

            { $unwind: "$meta" },
            { $unwind: "$prefMinSalary" },
            { $unwind: "$prefMaxSalary" },

            {
                $project: {
                    nbCandidates: "$meta.total",
                    page: { $literal: _filter.page },
                    nbPages: { $ceil: { $divide: ["$meta.total", _filter.limit] } },
                    candidates: "$candidates",
                    clusters: {
                        experiences: "$experiences",
                        employmentTypes: "$employmentTypes",
                        cities: "$cities",
                        educations: "$educations",
                        noticePeriods: "$noticePeriods",
                        skills: "$skills",
                        lastActives: [
                            { _id: 365, label: "1 year", count: 17 },
                            { _id: 180, label: "6 months", count: 17 }
                        ],
                        resume: [
                            { _id: 0, label: "All" },
                            { _id: 1, label: "Available" },
                            { _id: 2, label: "Unavailable" }
                        ],
                        candidateTypes: [
                            { _id: 0, label: "All", count: 17 },
                            { _id: 1, label: "Fresh", count: 17 },
                            { _id: 2, label: "Acted upon", count: 0 }
                        ],
                        salary: [
                            {
                                availableRange: { min: "$prefMinSalary.salary", max: "$prefMaxSalary.salary" },
                                ...(_filter.salary && {
                                    suggestedRange: {
                                        min: _filter.salary * (60 / 100),
                                        max: _filter.salary * (130 / 100)
                                    }
                                }),
                                offset: { min: 0.6, max: 1.3 },
                                unit: "Lakhs"
                            }
                        ],
                        workExperiences: [
                            { _id: 0, label: "All" },
                            { _id: 1, label: "Worked/Working in Same Role" },
                            { _id: 2, label: "Worked/Working in Similar Role" }
                        ],
                        priorities: PRIORITIES[jobCategory],
                    }
                }
            },

        ])
        //console.timeEnd("aggregate")                
        return candidates
    }
}