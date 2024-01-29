export default function makeSeeker({ jobSeekerDB, EMPLOYEE_S3VIEW_CDN }) {

    return async function seeker({ candidates, _filter = {} }) {

        const seeker_ids = candidates.map(x => x._id)

        const data = await jobSeekerDB.aggregate([
            {
                $match: {
                    id: { $in: [...seeker_ids] },
                    status: true
                }
            },

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
            },
            { $unwind: { path: "$education", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "seeker_educations",
                    let: { "seeker_id": "$id" },
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
            },
            { $unwind: { path: "$lastActiveInfo", preserveNullAndEmptyArrays: true } },

            { $set: { "locked": false } },
            {
                $project: {                   
                    _id: 0,
                    seekerId: "$seekerid",
                    isResume: { $toBool: "$resume" },
                    ...(_filter.jobId && {
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
                            "$locked",
                            "Unlock To View Candidate Name",
                            { $concat: ["$first_name", " ", "$last_name"] }
                        ]
                    },
                    pic: {
                        $cond: [
                            "$locked",
                            { $cond: ["$blurred_photo", { $concat: [EMPLOYEE_S3VIEW_CDN, "$blurred_photo"] }, null] },
                            { $cond: ["$photo", { $concat: [EMPLOYEE_S3VIEW_CDN, "$photo"] }, null] }
                        ]
                    },
                    contact: { email: "$email", mobile: "$mobile" },
                    contact: {
                        $cond: [
                            "$locked",
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
        ])
        return data
    }
}