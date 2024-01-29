export default function makeApplied({ seekerAppliedJobDB }) {

    return async function applied({ candidates, _filter = {} }) {

        const seeker_ids = candidates.map(x => x._id)
        const preferenceids = candidates.map(x => x.preferenceid)

        const data = await seekerAppliedJobDB.aggregate([
            {
                $match: {
                    seeker_id: { $in: [...seeker_ids] },
                    preference_id: { $in: [...preferenceids] },
                    job_id: _filter.jobId,
                    status: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    id: 1
                }
            }
        ])
        return data
    }
}