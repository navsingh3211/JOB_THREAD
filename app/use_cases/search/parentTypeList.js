export default function makeParentTypeList({ instituteCategorizationDB }) {

    return async function parentTypeList() {

        const parentTypes = await instituteCategorizationDB.findAll(
            { status: true, is_root: 1 },
            { select: { _id: 0, id: 1, name: 1 } }
        )

        return {
            parentTypes
        }
    }
}