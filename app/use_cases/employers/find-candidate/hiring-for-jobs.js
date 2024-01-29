export default function makeHiringForJobs({
    employerInstituteDB, jobPostDB,
}) {

    return async function hiringForJobs({ query, user: { employerId } }) {

        const domain = query.domain || null

        const institute = await employerInstituteDB.findOne(
            { id: domain, institution_company_id: employerId, status: true },
            { select: { institution_cat: 1, institution_subcat: 1, institution_subcat2: 1 } }
        )
        if (!institute) throw Error('Invalid domain')
            
        const jobs = await jobPostDB.aggregate([
            {
                $match: {
                    system_title: { $ne: null },
                    status: { $ne: null },
                    end_of_life_date: { $gt: new Date(Date.now()) },
                    employer_id: Number(employerId),
                    institute_profile_id: Number(domain),
                },
            },
            {
                $project: {
                    _id: 0,
                    jobID: '$id',
                    jobTitle: {
                        $cond: [{ $eq: ['$is_customtitle', true] }, '$customtitle', '$system_title']
                    },
                    is_private: '$is_private',
                    keyword: '$system_title',
                    jobid: '$ref_code',
                    encrypted_jobID: '$job_id',
                    vacancyCities: {
                        $cond: {
                            if: { $in: [true, '$vacancies.status'] },
                            then: '$vacancies.city', else: [],
                        }
                    },
                    hasParameters: {
                        $cond: [
                            {
                                $and: [
                                    { $ne: ["$title", null] },
                                    { $ne: ["$min_experience", null] },
                                    { $ne: ["$max_salary", null] },
                                    { $ne: ["$employment_type", null] },
                                    { $ne: ["$description", null] },
                                    { $ne: ["$min_education", null] },
                                    { $in: ["$status", [1, -1, 2]] },
                                    { $gt: ["$end_of_life_date", new Date(Date.now())] },
                                    { $ne: ["$vacancies", []] }
                                ]
                            },
                            true,
                            false
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "cities",
                    localField: "vacancyCities",
                    foreignField: "id",
                    as: "cities",
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$status', true] }] } } },
                        { $project: { _id: 0, name: 1 } }
                    ],
                }
            },
            { $unwind: { path: "$cities", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "employer_saved_employees",
                    localField: "jobID",
                    foreignField: "job_id",
                    as: "savedEmployees",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$status', true] },
                                    ],
                                },
                            }
                        },
                    ],
                }
            },

            {
                $lookup: {
                    from: "employer_invited_employees",
                    localField: "jobID",
                    foreignField: "job_id",
                    as: "invitedEmployees",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$status', true] },
                                        { $eq: ['$is_removed', false] },
                                        { $eq: ['$is_processed', true] },
                                        { $eq: ['$is_shortlisted', false] },
                                    ],
                                },
                            },
                        },
                    ],
                },
            },

            {
                $replaceRoot:
                {
                    newRoot:
                    {
                        $mergeObjects: [
                            "$$ROOT",
                            {
                                location: "$cities.name",
                                savedCandidateCount: { $size: "$savedEmployees.id" },
                                invitedCandidateCount: { $size: "$invitedEmployees.id" },
                            }
                        ]
                    }
                }
            },
            { $unset: ["cities", "vacancyCities", "savedEmployees", "invitedEmployees"] },

            {
                $group: {
                    _id: "$is_private",
                    data: { $push: "$$ROOT" }
                }
            },

            {
                $replaceRoot: {
                    newRoot: {
                        job_post: {
                            $cond: {
                                if: { $in: [false, '$data.is_private'] },
                                then: '$data', else: null,
                            }
                        },
                        private_job_post: {
                            $cond: {
                                if: { $in: [true, '$data.is_private'] },
                                then: '$data', else: null,
                            }
                        },
                    }
                }
            },
        ])
        // console.log(jobs[0]);
        const jobdetails = {
          job_post:
            (jobs[0] ? jobs[0].job_post : null) ??
            (jobs[1] ? jobs[1].job_post : null),
          private_job_post:
            (jobs[0] ? jobs[0].private_job_post : null) ??
            (jobs[1] ? jobs[1].private_job_post : null),
        };

        return {
            jobdetails
        }
    }
}