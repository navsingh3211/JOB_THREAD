export default function makeShortlisted({ employeeShortlistedDB }) {

    return async function shortlisted({ candidates, _filter = {} }) {

        const seeker_ids = candidates.map(x => x._id)
        const preferenceids = candidates.map(x => x.preferenceid)

        const data = await employeeShortlistedDB.aggregate([
            {
                $match: {
                    seeker_id: { $in: [...seeker_ids] },
                    seeker_prefId: { $in: [...preferenceids] },
                    job_id: _filter.jobId,
                    status: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    created_on: 1
                }
            }
        ])
        return data
    }
}