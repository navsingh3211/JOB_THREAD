export default function makePreference({ seekerPreferenceDB }) {

    return async function preference({ candidates, _filter = {} }) {

        const preferenceids = candidates.map(x => x.preferenceid)

        const data = await seekerPreferenceDB.aggregate([
            {
                $match: {
                    id: { $in: [...preferenceids] },
                    status: 1
                }
            },

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
            },
            { $unwind: { path: "$experience", preserveNullAndEmptyArrays: true } },

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
                },
            }
        ])
        //console.log('data ', data)
        return data
    }
}