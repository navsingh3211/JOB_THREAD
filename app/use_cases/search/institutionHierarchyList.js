export default function makeInstitutionHierarchyList({
    instituteCategorizationDB,
    instituteCategorizationConfigDB,
    instituteCategorizationsMapDB,
}) {

    return async function institutionHierarchyList() {

        //return { message: 'Institution Hierarchy List endpoint' }
        let hierarchies = {}
        const parentTypes = await instituteCategorizationDB.parentTypes({},
            { select: { _id: 0, id: 1, name: 1 } }
        )

        hierarchies.parentTypes = parentTypes

        //Sub Category1 data preparation
        await Promise.all(
            hierarchies.parentTypes.map(async (parent, index) => {

                const subCategory1Config = await instituteCategorizationConfigDB.findOne(
                    { category_id: parent.id, area_of_operation: 1, level_no: 1, status: 1 }
                )
                if (!subCategory1Config) return false

                // const subCategories1 = await instituteCategorizationDB.subCategories1(
                //     { parentId: parent.id },
                //     { select: { _id: 0, id: 1, name: 1 } }
                // )

                const subCategories1Id = await instituteCategorizationsMapDB.findAll(
                    { root_cat: parent.id, level: 1 },
                    { distinct: 'child_id' }
                )

                const subCategories1 = await instituteCategorizationDB.findAll(
                    { id: subCategories1Id, status: true },
                    { select: { _id: 0, id: 1, name: 1 } }
                )

                //console.log('subCategories1Id ', subCategories1Id)

                //Sub Category2 data preparation
                await Promise.all(
                    subCategories1.map(async (subcat, sindex) => {

                        const subCategory2Config = await instituteCategorizationConfigDB.findOne(
                            { category_id: parent.id, area_of_operation: 1, level_no: 2, status: 1 }
                        )
                        if (!subCategory2Config) return false

                        const subCategories2Id = await instituteCategorizationsMapDB.findAll(
                            { root_cat_1: subcat.id, level: 2 },
                            { distinct: 'child_id' }
                        )
                        const subCategories2 = await instituteCategorizationDB.findAll(
                            { id: subCategories2Id, status: true },
                            { select: { _id: 0, id: 1, name: 1 } }
                        )

                        subCategories1[sindex].label = subCategory2Config?.label || null
                        subCategories1[sindex].subCategories2 = subCategories2
                    })
                )

                hierarchies.parentTypes[index].label = subCategory1Config?.label || null
                hierarchies.parentTypes[index].subCategories1 = subCategories1
            })
        )

        return {
            hierarchies,
        }
    }
}