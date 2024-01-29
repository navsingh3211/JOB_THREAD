export default function makeJobTypeList({ jobCategoryDB }) {

    return async function jobTypeList() {

        const jobTypes = await jobCategoryDB.findAll(
            { status: true },
            { select: { _id: 0, id: 1, name: 1 } }
        )

        return {
            jobTypes
        }
    }
}