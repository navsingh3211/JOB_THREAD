export default function makeSkill({ seekerSkillDB }) {

    return async function skill({ candidates, _filter = {} }) {

        const seeker_ids = candidates.map(x => x._id)

        const data = await seekerSkillDB.aggregate([
            {
                $match: {
                    seeker_id: { $in: [...seeker_ids] },
                    status: true
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$skill_id",
                    label: "$name"
                }
            }
        ])
        return data
    }
}