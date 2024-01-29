export default function makeCandidateListRevamp({
    validator,
    cacheSearchCandidateResultDB, cacheProbableTitlesDB, jobPostDB, priorityScoreDB,
    EMPLOYEE_S3VIEW_CDN, PRIORITIES,
    contactRevealed, preference, seeker, experience, skill,
    saved, invited, applied, shortlisted,
}) {

    return async function candidateListRevamp({ query, user: { employerId } }) {

        const request = await validator(query, {})
        //console.log('request ', request)

        const _filter = {
            keyword: request.k || null,
            jobId: request.jid || null,
            cities: request.l || null,
            experience: request.exp || null,
            noticePeriod: request.npd || null,
            salary: request.sal || null,
            employmentType: request.et || null,
            candidateType: request.ct || null,
            education: request.ed || null,
            skills: request.skill || null,
            lastActive: request.la || null,
            resume: request.resume || null,
            workex: request.workex || null,
            priority: request.priority || null,
            page: request.page || 1,
            limit: request.limit || 10,
        }
        _filter.offset = (_filter.page - 1) * _filter.limit
        //console.log(_filter)
        if (!_filter.keyword && !_filter.jobId) throw Error('Keyword or job reference required')

        // -----------
        let isInitSrch = false // initial search
        let isJobSearch = false
        let isTempJob = false
        let matchedTitles = { perfect: [], imperfect: [] }
        const minRequiredVal = {} // min required value of job or filter

        if (_filter.jobId) {
            const jobInfo = await jobPostDB.findOne({ job_id: _filter.jobId, status: { $in: [-1, 1] } })
            if (!jobInfo) throw Error('Invalid job')
            isJobSearch = true
            _filter.jobId = jobInfo.id
            _filter.keyword = jobInfo.system_title
            minRequiredVal.EXP = jobInfo.min_experience
            minRequiredVal.NPD = jobInfo.notice_period
            minRequiredVal.SAL = jobInfo.max_salary
            minRequiredVal.SKL = jobInfo && jobInfo.skills.map(x => x.status && x.skill_id)

            // check is temp/ fake job
            if (jobInfo.is_private && (
                !jobInfo.title || !jobInfo.min_experience || !jobInfo.max_salary ||
                !jobInfo.employment_type || !jobInfo.description || !jobInfo.notice_period ||
                !jobInfo.min_education || !jobInfo.vacancies)
            ) { isTempJob = true }
        }

        const titles = await cacheProbableTitlesDB.findMatchTitles({ title: _filter.keyword })
        if (!titles) throw Error('Title was not found in the system')

        const titleInfo = await cacheProbableTitlesDB.findOne({ title: _filter.keyword })
        const jobCategory = titleInfo.job_category

        //console.time("jscode")
        for (let i = 0; i < titles.length; i++) {
            matchedTitles[titles[i].rank > 0 ? 'perfect' : 'imperfect'].push(titles[i].title)
        }
        //console.timeEnd("jscode")

        if (!_filter.priority) {
            isInitSrch = true
            _filter.priority = PRIORITIES[jobCategory].map(x => x._id)
        }

        const _filterPriorityOrder = [..._filter.priority.keys()].map(x => x + 1)
        const priorityScores = await priorityScoreDB.findAll({ searchpriority: { $in: _filterPriorityOrder } })
        let prioConstScores = {}
        let prioHighScoreTtl = 0
        priorityScores.map((x, i) => {
            prioHighScoreTtl += x.highest
            prioConstScores[_filter.priority[i]] = { highest: x.highest, lowest: x.lowest }
        })

        // console.log('_filterPriorityOrder -> ', _filterPriorityOrder)
        // console.log('prioConstScores -> ', prioConstScores)

        //if (isInitSrch) prioConstScores = { JTL: prioConstScores.JTL } // JTL SCORE
        minRequiredVal.EXP = _filter.experience || minRequiredVal.EXP || 0
        minRequiredVal.NPD = _filter.noticePeriod || minRequiredVal.NPD || 0
        minRequiredVal.NPD = minRequiredVal.NPD > 0 ? (minRequiredVal.NPD - 1) * 15 : minRequiredVal.NPD
        minRequiredVal.SAL = _filter.salary || minRequiredVal.SAL

        const nbExtraSkills = (_filter.skills && minRequiredVal?.SKL) ? _filter.skills.filter(x => !minRequiredVal.SKL.includes(x)).length : 0
        //minRequiredVal.SKL = minRequiredVal?.SKL ? [...new Set([..._filter.skills, ...minRequiredVal.SKL])] : _filter.skills
        //const nbRequiredSkills = [...new Set([...(_filter.skills) || [], ...(minRequiredVal.SKL) || []])].length
        const nbRequiredJobSkills = minRequiredVal?.SKL?.length || 0
        minRequiredVal.SKL = _filter.skills || minRequiredVal.SKL || []

        // console.log('minRequiredVal ', minRequiredVal)
        //console.log('prioConstScores ', prioConstScores)        

        //console.time("aggregate")
        //console.timeEnd("aggregate")

        const candidates = await cacheSearchCandidateResultDB.aggregate([
            {
                $match: {
                    ...(((!isJobSearch && _filter.keyword) || isTempJob) && {
                        job_title: { $in: [...matchedTitles.perfect, ...matchedTitles.imperfect] }
                    }),
                    ...(_filter.jobId && { jobpostid: _filter.jobId }),
                },
            },
            {
                $group: {
                    _id: "$seeker_id",
                    preferenceid: { $first: "$preferenceid" },
                    preference_title: { $first: "$preference_title" },
                    noticePeriod: { $first: "$preference_notice_period" },
                    JTL_SCORE_: { $first: "$JTL_SCORE" },
                    TOTALSCORE_: { $first: "$TOTALSCORE" },
                }
            },

            { $set: { isPerfectMatch: { $cond: [{ $in: ['$preference_title', matchedTitles.perfect] }, true, false] } } },
        ])

        //console.log('candidates ', candidates)
        const contactRevealedData = await contactRevealed({ candidates, _filter })
        //console.log('contactRevealed ret ', contactRevealedData)

        const preferenceData = await preference({ candidates, _filter })
        //console.log('preference ret ', preferenceData)

        const seekerData = await seeker({ candidates, _filter })
        //console.log('seekerData ', seekerData)

        //experience, skill, saved, invited, applied, shortlisted,
        const experienceData = await experience({ candidates, _filter })

        const skillData = await skill({ candidates, _filter })
        const savedData = await saved({ candidates, _filter })
        const appliedData = await applied({ candidates, _filter })
        const invitedData = await invited({ candidates, _filter })
        const shortlistedData = await shortlisted({ candidates, _filter })

        return {
            candidates,
            contactRevealedData,
            preferenceData,
            seekerData,
            experienceData,
            skillData,
            savedData,
            appliedData,
            invitedData,
            shortlistedData
        }
    }
}