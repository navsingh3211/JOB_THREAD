export default function makeExperience({ seekerExperienceDB }) {

    return async function experience({ candidates, _filter = {} }) {

        const seeker_ids = candidates.map(x => x._id)

        const data = await seekerExperienceDB.aggregate([
            {
                $match: {
                    seeker_id: { $in: [...seeker_ids] },
                    status: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    currCo: "$current_company",
                    title: 1,
                    company: "$institute_name"
                }
            },            
        ])

        return data
    }
}