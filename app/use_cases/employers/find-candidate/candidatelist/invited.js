export default function makeInvited({ employerInvitedEmployeeDB }) {

    return async function invited({ candidates, _filter = {} }) {

        const seeker_ids = candidates.map(x => x._id)
        const preferenceids = candidates.map(x => x.preferenceid)

        const data = await employerInvitedEmployeeDB.aggregate([
            {
                $match: {
                    seeker_id: { $in: [...seeker_ids] },
                    seeker_prefId: { $in: [...preferenceids] },
                    job_id: _filter.jobId,
                    status: true
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