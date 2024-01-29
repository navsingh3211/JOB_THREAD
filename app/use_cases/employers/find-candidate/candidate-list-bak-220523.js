export default function makeCandidateList({
    validator,
    employerInstituteDB, cacheSearchCandidateResultDB, cacheProbableTitlesDB,
    EMPLOYEE_S3VIEW_CDN, PRIORITIES
}) {

    return async function candidateList({ query, user: { employerId } }) {

        const institutes = await employerInstituteDB.findAll(
            { institution_company_id: employerId, status: true },
            { distinct: 'id' }
        )

        const request = await validator(query, { domains: institutes })
        //console.log('request ', request)

        const _filter = {
            keyword: request.k || null,
            jobId: request.jid || null,
            domain: request.domain || null,
            city: request.l || null,
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

        // -----------
        const titles = await cacheProbableTitlesDB.findMatchTitles({ title: _filter.keyword })
        if (!titles) throw Error('Title was not found in the system')

        const titleInfo = await cacheProbableTitlesDB.findOne({ title: _filter.keyword })

        let matchedTitles = { perfect: [], imperfect: [] }
        
        for (let i = 0; i < titles.length; i++) {
            matchedTitles[titles[i].rank === 1 ? 'perfect' : 'imperfect'].push(titles[i].title)
        }
        
        //console.log(titles)
        console.time("aggregate")
        const candidates = await cacheSearchCandidateResultDB.aggregate([            
            
            {
                $match: {
                    job_title: { $in: [...matchedTitles.perfect, ...matchedTitles.imperfect] },
                },
            },
            { $sort: { _id: 1 } },
            {
                $group: {
                    _id: "$seeker_id",
                    preferenceid: { $first: "$preferenceid" },
                    priority_searched_for: { $first: "$priority_searched_for" },
                    preference_title: { $first: "$preference_title" },
                    seeker_id: { $first: "$seeker_id" },
                    REJECT_flag: { $first: 0 },
                    is_perfectmatch_2: {
                        $first: {
                            $cond: {
                                if: { $in: ['$preference_title', matchedTitles.perfect] },
                                then: 1, else: 0,
                            }
                        }
                    },
                    isActed: { $first: 1 },
                    isSaved: { $first: false },
                    isInvited: { $first: false },
                    locked: { $first: true },
                    is_perfectmatch: { $first: "$is_perfectmatch" },
                }
            },
            { $sort: { preferenceid: -1 } },

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
                            $project: {
                                _id: 0,
                                experience: 1,
                                employmentType: "$employment_type",
                                salary: "$min_salary",
                                cities: "$locations.cities.city",
                                matched: { $literal: 74 },
                            }
                        },

                        {
                            $lookup: {
                                from: "experiences",
                                localField: "experience",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$name" } },
                                ],
                                as: "experience"
                            }
                        },
                        { $unwind: { path: "$experience", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "employment_types",
                                localField: "employmentType",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$type" } },
                                ],
                                as: "employmentType"
                            }
                        },
                        { $unwind: { path: "$employmentType", preserveNullAndEmptyArrays: true } },

                        { $unwind: { path: "$cities", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "cities",
                                localField: "cities",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$name" } },
                                ],
                                as: "cities"
                            }
                        },

                    ],
                }
            },
            { $unwind: { path: "$pref", preserveNullAndEmptyArrays: true } },
            // <<<<< PREFERENCE           

            //{ $unwind: { path: "$employmentType", preserveNullAndEmptyArrays: true } },

            // STAGE::  JOBSEEKER >>>>>
            {
                $lookup: {
                    from: "jobseekers",
                    let: { "seeker_id": "$seeker_id" },
                    localField: "seeker_id",
                    foreignField: "id",
                    as: "seeker",
                    pipeline: [
                        { $match: { status: true } },
                        {
                            $project: {
                                _id: 0,
                                seekerId: "$seekerid",
                                isResume: { $cond: [{ $ne: ['$resume', null] }, true, false] },
                                // name: {
                                //     $trim: { input: { $concat: ["$first_name", " ", "$last_name"] } }
                                // },
                                name: 'Unlock To View Candidate Name',
                                pic: {
                                    $cond: [
                                        { $ne: ['$blurred_photo', null] },
                                        { $concat: [EMPLOYEE_S3VIEW_CDN, "$blurred_photo"] },
                                        null
                                    ]
                                },
                                contact: null,
                                // contact: {
                                //     email: "$email",
                                //     mobile: "$mobile"
                                // },
                                education: "$highest_education",
                                //educationSpec: { $literal: 2 },
                                isFresher: {
                                    $cond: [{ $eq: ['$is_experienced', true] }, false, true]
                                },
                                lastEdited: "2023-05-05 09:54:37",
                                lastActive: "2023-05-05 09:54:37",

                            }
                        },

                        {
                            $lookup: {
                                from: "educations",
                                localField: "education",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$type" } },
                                ],
                                as: "education",
                            }
                        },
                        { $unwind: { path: "$education", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "seeker_educations",
                                localField: "education.id",
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
                        },
                        { $unwind: { path: "$educationSpec", preserveNullAndEmptyArrays: true } },

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
                        },
                        { $unwind: { path: "$educationSpec", preserveNullAndEmptyArrays: true } },
                        { $replaceRoot: { newRoot: { $mergeObjects: ["$$ROOT", { educationSpec: "$educationSpec.label" }] } } },

                    ],
                }
            },
            { $unwind: { path: "$seeker", preserveNullAndEmptyArrays: true } },
            // <<<<< JOBSEEKER

            {
                $match: {
                    pref: { $ne: null },
                    seeker: { $ne: null }
                }
            },

            // STAGE::  EXPERIENCE >>>>>
            {
                $lookup: {
                    from: "seeker_experiences",
                    localField: "seeker_id",
                    foreignField: "seeker_id",
                    as: "experiences",
                    pipeline: [
                        { $match: { status: 1 } },
                        {
                            $project: {
                                _id: 0,
                                title: 1,
                                company: "$institute_name",
                                currCo: "$current_company",
                                //currCo: "Yes",
                                noticePeriod: "$notice_period",
                                //noticePeriod: { $literal: 2 },
                            }
                        },
                        {
                            $lookup: {
                                from: "notice_periods",
                                localField: "noticePeriod",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$name", day: 1 } },
                                ],
                                as: "noticePeriod"
                            }
                        },
                        { $unwind: "$noticePeriod" },
                    ],
                }
            },
            // <<<<< EXPERIENCE            

            // STAGE::  SKILL >>>>>
            {
                $lookup: {
                    from: "seeker_skills",
                    localField: "seeker_id",
                    foreignField: "seeker_id",
                    as: "skills",
                    pipeline: [
                        { $match: { status: true } },
                        { $project: { _id: 0, id: "$skill_id", label: "$name" } },
                    ],
                }
            },
            // <<<<< SKILL

            //  FILTER >>>>>
            {
                $match: {
                    ...(_filter.experience && { "pref.experience.id": _filter.experience }),
                    ...(_filter.employmentType && { "pref.employmentType.id": _filter.employmentType }),
                    ...(_filter.city && { "pref.cities.id": _filter.city }),
                    ...(_filter.salary && { "pref.salary": { $lte: _filter.salary } }),
                    ...(_filter.education && { "seeker.education.id": _filter.education }),
                    ...(_filter.resume && { "seeker.isResume": _filter.resume === 1 ? true : false }),
                    //...(_filter.noticePeriod && { "experiences.noticePeriod.day": _filter.noticePeriod }),
                    ...(_filter.skills && { "skills.id": { $in: _filter.skills } }),
                }
            },
            // <<<<<

            // STAGE::  CANDIDATES & CLUSTORS >>>>>
            {
                $facet: {
                    noticePeriods: [
                        { $unwind: "$experiences" },
                        {
                            $group: {
                                _id: "$experiences.noticePeriod.id",
                                day: { $first: "$experiences.noticePeriod.day" },
                                label: { $first: "$experiences.noticePeriod.label" },
                                count: { $sum: 1 },
                            }
                        },
                        { $sort: { count: -1 } },
                        //{ $project: { _id: 0, id: "$_id", day: "$day", label: "$label", count: "$count" } }
                    ],
                    experiences: [
                        { $unwind: "$pref.experience" },
                        {
                            $group: {
                                _id: "$pref.experience.id",
                                label: { $first: "$pref.experience.label" },
                                count: { $sum: 1 },
                            }
                        },
                        { $sort: { count: -1 } },
                        //{ $project: { _id: 0, id: "$_id", label: "$label", count: "$count" } }
                    ],
                    employmentTypes: [
                        { $unwind: "$pref.employmentType" },
                        {
                            $group: {
                                _id: "$pref.employmentType.id",
                                label: { $first: "$pref.employmentType.label" },
                                count: { $sum: 1 },
                            }
                        },
                        { $sort: { count: -1 } },
                        //{ $project: { _id: 0, id: "$_id", label: "$label", count: "$count" } }
                    ],
                    cities: [
                        { $unwind: "$pref.cities" },
                        {
                            $group: {
                                _id: "$pref.cities.id",
                                label: { $first: "$pref.cities.label" },
                                count: { $sum: 1 },
                            }
                        },
                        { $sort: { count: -1 } },
                        //{ $project: { _id: 0, id: "$_id", label: "$label", count: "$count" } }
                    ],
                    educations: [
                        { $unwind: "$seeker.education" },
                        {
                            $group: {
                                _id: "$seeker.education.id",
                                label: { $first: "$seeker.education.label" },
                                count: { $sum: 1 },
                            }
                        },
                        { $sort: { count: -1 } },
                        //{ $project: { _id: 0, id: "$_id", label: "$label", count: "$count" } }
                    ],
                    skills: [
                        { $unwind: "$skills" },
                        {
                            $group: {
                                _id: "$skills.id",
                                label: { $first: "$skills.label" },
                                count: { $sum: 1 },
                            }
                        },
                        { $sort: { count: -1 } },
                        //{ $project: { _id: 0, id: "$_id", label: "$label", count: "$count" } }
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
                                            pref: {
                                                $mergeObjects: [
                                                    "$$ROOT.pref",
                                                    {
                                                        employmentType: "$pref.employmentType.label",
                                                        experience: "$pref.experience.label",
                                                        cities: "$pref.cities.label"
                                                    }
                                                ]
                                            },
                                            workEx: {
                                                $cond: {
                                                    if: { $in: ["Yes", '$experiences.currCo'] },
                                                    then: {
                                                        noticePeriod: { $max: "$experiences.noticePeriod.day" },
                                                        nbCurrCo: { $size: "$experiences.currCo" },
                                                        title: { $first: "$experiences.title" },
                                                        company: { $first: "$experiences.company" },
                                                    },
                                                    else: {
                                                        $cond: {
                                                            if: { $in: ["No", '$experiences.currCo'] },
                                                            then: {
                                                                noticePeriod: 0,
                                                                nbCurrCo: 0,
                                                                title: { $first: "$experiences.title" },
                                                                company: { $first: "$experiences.company" },
                                                            },
                                                            else: null
                                                        }
                                                    }
                                                }
                                            },
                                            skills: "$skills.label",
                                        }
                                    ]
                                }
                            }
                        },
                    ],
                }
            },
            // <<<<< CANDIDATES & CLUSTORS

            { $unwind: "$meta" },
            { $unset: ["candidates.experiences"] },

            //{ $match: { "candidates.workEx.noticePeriod": 15 } },
            //...(_filter.noticePeriod && { "experiences.noticePeriod.day": _filter.noticePeriod }),

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
                            { id: 365, label: "1 year", count: 17 },
                            { id: 180, label: "6 months", count: 17 }
                        ],
                        resume: [
                            { id: 0, label: "All" },
                            { id: 1, label: "Available" },
                            { id: 2, label: "Unavailable" }
                        ],
                        candidateTypes: [
                            { id: 0, label: "All", count: 17 },
                            { id: 1, label: "Fresh", count: 17 },
                            { id: 2, label: "Acted upon", count: 0 }
                        ],
                        salary: [
                            {
                                range: {
                                    min: { $first: "$prefMinSalary.salary" },
                                    max: { $first: "$prefMaxSalary.salary" },
                                },
                                offset: { min: 0.6, max: 1.3 },
                                unit: "Lakhs"
                            }
                        ],
                        workExperiences: [
                            { id: 0, label: "All" },
                            { id: 1, label: "Worked/Working in Same Role" },
                            { id: 2, label: "Worked/Working in Similar Role" }
                        ],
                        priorities: PRIORITIES[titleInfo.job_category]
                    }
                }
            },
        ])
        console.timeEnd("aggregate")
        return candidates
        // -----------


        const res = {
            nbCandidates: 5,
            page: 1,
            nbPages: 2,
            candidates: []
        }
        const clusters = {
            candidateTypes: [
                { id: 0, count: 17, label: "All" },
                { id: 1, count: 17, label: "Fresh" },
                { id: 2, count: 0, label: "Acted upon" },
            ],
            cities: [
                { id: 5583, count: 15, label: "Kolkata" },
                { id: 706, count: 5, label: "Delhi" },
            ],
            educations: [
                { id: 1, count: 17, label: "Class 10th" },
                { id: 2, count: 17, label: "Class 12th" },
            ],
            employmentTypes: [
                { id: 1, count: 15, label: "Full-time" },
                { id: 8, count: 2, label: "Leave Vacancy" },
            ],
            experiences: [
                { id: 2, count: 1, label: "2 Years" },
                { id: 5, count: 14, label: "5 Years" },
            ],
            lastActives: [
                { id: 365, count: 17, label: "1 year" },
                { id: 180, count: 17, label: "6 months" },
            ],
            noticePeriods: [
                { id: 1, count: 14, day: 0, label: "Immediate Joiner" },
                { id: 3, count: 1, day: 30, label: "30 Days" },
                { id: 4, count: 2, day: 45, label: "45 Days" }
            ],
            priorities: [
                { id: "JTL", label: "Job Title" },
                { id: "LAY", label: "Last Activity" },
                { id: "EXP", label: "Experience" },
                { id: "NPD", label: "Notice Period" },
                { id: "SAL", label: "Salary" },
                { id: "SKL", label: "Skills" }
            ],
            resume: [
                { id: 0, label: "All" },
                { id: 1, label: "Available" },
                { id: 2, label: "Unavailable" },
            ],
            salary: [
                {
                    range: { min: 500000, max: 9313316 },
                    offset: { min: 0.6, max: 1.3 },
                    unit: "Lakhs"
                }
            ],
            skills: [
                { id: 3016, count: 3, label: "Communication Skills" },
                { id: 2003, count: 2, label: "Business Communication" },
            ],
            workExperiences: [
                { id: 0, label: "All" },
                { id: 1, label: "Worked/Working in Same Role" },
                { id: 2, label: "Worked/Working in Similar Role" },
            ],
        }


        return {
            ...res,
            clusters
        }
    }
}