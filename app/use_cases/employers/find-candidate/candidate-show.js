export default function makeCandidateShow({
    seekerPreferenceDB,
    EMPLOYEE_S3VIEW_CDN
}) {

    return async function candidateShow({ params: { prefId }, query }) {
        //console.log('prefId ', prefId)

        const _filter = {
            jobId: query.jid || null
        }

        const candidate = await seekerPreferenceDB.aggregate([
            { $match: { id: parseInt(prefId), status: 1 } },

            {
                $project: {
                    _id: 0,
                    seeker_id: 1,
                    prefId: "$id",
                }
            },

            // STAGE::  CONTACT REVEALED >>>>>
            {
                $lookup: {
                    from: "employee_contact_revealeds",
                    localField: "seeker_id",
                    foreignField: "seeker_id",
                    as: "unlocked",
                    pipeline: [
                        { $match: { job_id: _filter.jobId, status: 1 } },
                        { $limit: 1 },
                        { $project: { _id: 0, id: 1, created_on: 1 } },
                    ],
                }
            }, { $unwind: { path: "$unlocked", preserveNullAndEmptyArrays: true } },
            { $set: { locked: { $cond: ["$unlocked.id", false, true] }, unlockedAt: "$unlocked.created_on" } },
            { $unset: "unlocked" },
            // <<<<< CONTACT REVEALED

            // STAGE::  JOBSEEKER >>>>>
            {
                $lookup: {
                    from: "jobseekers",
                    let: { "seeker_id": "$seeker_id", "locked": "$locked" },
                    localField: "seeker_id",
                    foreignField: "id",
                    as: "personalDetails",
                    pipeline: [
                        { $match: { status: true } },

                        {
                            $lookup: {
                                from: "languages",
                                localField: "languages.language",
                                foreignField: "lang_id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: "$lang_id", label: "$lang_name" } },
                                ],
                                as: "languagesinfo"
                            }
                        },

                        {
                            $project: {
                                _id: 0,
                                seekerId: "$seekerid",
                                isResume: { $toBool: "$resume" },
                                resume: {
                                    $cond: [
                                        { $and: [{ $eq: ["$$locked", false] }, { $ne: ['$resume', null] }] },
                                        { $concat: [EMPLOYEE_S3VIEW_CDN, "$resume"] },
                                        null
                                    ]
                                },
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
                                contact: {
                                    $cond: ["$$locked", null, { email: "$email", mobile: "$mobile" }]
                                },
                                address: 1,
                                gender: 1,
                                marital_status: 1,
                                dob: {
                                    $dateToString: { format: "%Y-%m-%d", date: "$dob" }
                                },
                                languages: {
                                    $map: {
                                        input: "$languages",
                                        as: "language",
                                        in: {
                                            language: {
                                                $cond: [
                                                    { $eq: ["$$language.language_isother", true] },
                                                    "$$language.language_other",
                                                    { $arrayElemAt: ["$languagesinfo.label", { $indexOfArray: ["$languagesinfo.id", "$$language.language"] }] }
                                                ]
                                            },
                                            reading: "$$language.prof_reading",
                                            writing: "$$language.prof_writing",
                                            speaking: "$$language.prof_speaking"
                                        }
                                    }
                                },
                                description: "$prof_description",
                                isFresher: { $not: "$is_experienced" },
                                lastEdited: "2023-05-05T06:10:05.000Z",
                                lastActive: "$last_active",
                            }
                        },
                    ],
                }
            },
            { $unwind: "$personalDetails" },
            // <<<<< JOBSEEKER

            // STAGE::  EXPERIENCE >>>>>
            {
                $lookup: {
                    from: "seeker_experiences",
                    localField: "seeker_id",
                    foreignField: "seeker_id",
                    as: "workExperiences",
                    pipeline: [
                        { $match: { status: 1 } },
                        {
                            $lookup: {
                                from: "notice_periods",
                                localField: "notice_period",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$name", day: 1 } },
                                ],
                                as: "noticePeriod"
                            }
                        }, { $unwind: { path: "$noticePeriod", preserveNullAndEmptyArrays: true } },
                        {
                            $project: {
                                _id: 0,
                                currCo: "$current_company",
                                title: 1,
                                company: "$institute_name",
                                noticePeriod: "$noticePeriod.label"
                            }
                        }
                    ]
                }
            },
            // <<<<< EXPERIENCE

            // STAGE::  EDUCATION >>>>>
            {
                $lookup: {
                    from: "seeker_educations",
                    localField: "seeker_id",
                    foreignField: "seeker_id",
                    pipeline: [
                        { $match: { status: 1 } },

                        {
                            $lookup: {
                                from: "educations",
                                localField: "education_id",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$type" } },
                                ],
                                as: "educationInfo",
                            }
                        }, { $unwind: { path: "$educationInfo", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "education_specializations",
                                localField: "specialization",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, label: "$name" } },
                                ],
                                as: "specialization"
                            }
                        }, { $unwind: { path: "$specialization", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "cities",
                                localField: "city",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$name" } },
                                ],
                                as: "city"
                            }
                        }, { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },

                        {
                            $lookup: {
                                from: "boards",
                                localField: "board",
                                foreignField: "id",
                                pipeline: [
                                    { $match: { status: true } },
                                    { $project: { _id: 0, id: 1, label: "$name" } },
                                ],
                                as: "board"
                            }
                        }, { $unwind: { path: "$board", preserveNullAndEmptyArrays: true } },

                        {
                            $project: {
                                _id: 0,
                                name: "$educationInfo.label",
                                specialization: "$specialization.label",
                                board: "$board.label",
                                stream: 1,
                                instituteName: {
                                    $cond: ["$institute_isother", "$institute_other", "$institute_name"]
                                },
                                city: "$city.label",
                                grade: "$grade",
                                passingYear: "$passing_year"
                            }
                        },
                    ],
                    as: "educations",
                }
            },
            // <<<<< EDUCATION

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
            { $set: { skills: "$skills.label" } },
            // <<<<< SKILL  

            // STAGE::  QUALIFICATION >>>>>
            {
                $lookup: {
                    from: "seeker_qualifications",
                    localField: "seeker_id",
                    foreignField: "seeker_id",
                    as: "qualifications",
                    pipeline: [
                        { $match: { status: true } },
                        {
                            $project: {
                                _id: 0,
                                qualification: "$qualification",
                                qualificationOther: "$qualifications_other",
                                levelCleared: "$level_cleared", authority: "$authority",
                                startDate: { $dateToString: { format: "%Y-%m-%d", date: "$start_date" } },
                                endDate: { $dateToString: { format: "%Y-%m-%d", date: "$end_date" } }
                            }
                        },
                    ],
                }
            },
            // <<<<< QUALIFICATION

            // STAGE::  ACHIEVEMENT >>>>>
            {
                $lookup: {
                    from: "seeker_achievements",
                    localField: "seeker_id",
                    foreignField: "seeker_id",
                    as: "achievements",
                    pipeline: [
                        { $match: { status: true } },
                        {
                            $project: { _id: 0, achievement: 1, year: 1 }
                        }
                    ],
                }
            },
            // <<<<< ACHIEVEMENT

            { $unset: ["seeker_id"] }
        ])

        return { candidate: candidate.length > 0 ? candidate[0] : null }
    }
}