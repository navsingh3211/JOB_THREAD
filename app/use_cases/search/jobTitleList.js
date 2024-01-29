export default function makeJobTitleList({ cacheProbableTitlesDB, jobPostDB }) {

    return async function jobTitleList({ query }) {

        const { jobtype, parent_type } = query

        const cacheProbalestitles = await cacheProbableTitlesDB.findAll()
        const cacheTitles = cacheProbalestitles.map(d => d.title)

        let titles = await jobPostDB.findAll({
            system_title: cacheTitles,
            ...(jobtype && { job_category: jobtype }),
            ...(parent_type && { institution_cat: parent_type }),
        }, { select: 'title _id' }
        )

        titles = [...new Map(titles.map(item =>
            [item['title'], item])).values()];

        return {
            titles
        }
    }
}