export default function makeContactRevealed({ employeeContactRevealedDB }) {

    return function contactRevealed({ candidates, _filter = {} }) {

        //console.log('candidates ', candidates)
        const seeker_ids = candidates.map(x => x._id)
        const data = employeeContactRevealedDB.aggregate([
            {
                $match: {
                    seeker_id: { $in: [...seeker_ids] },
                    ...(_filter.jobId && { job_id: _filter.jobId }),
                    status: 1
                }
            },
            {
                $group: {
                    _id: "$seeker_id",                    
                    id: { $first: "$id" },
                    created_on: { $first: "$created_on" },
                }
            },        
            {
                $project: {
                    _id: 0,
                    seeker_id: "$_id",
                    id: 1,
                    created_on: 1
                },
            }
        ])
        return data
    }
}