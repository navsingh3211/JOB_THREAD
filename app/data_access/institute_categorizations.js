export default function makeInstituteCategorizationDB(docModels, sqMmodels) {

    async function findOne(_filter) {
        const query = await docModels.InstituteCategorization.findOne(_filter)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.InstituteCategorization.find(_filter)
        if (select) query.select(select)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.InstituteCategorization.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.InstituteCategorization.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.InstituteCategorization.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.InstituteCategorization.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.InstituteCategorization.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.InstituteCategorization.findAll({ raw: true, where: _filter, ..._options })
        return project
    }

    // Functions to get defined data
    async function parentTypes(_filter = {}, _options = {}) {

        _filter.is_root = 1
        _filter.status = _filter.status || true

        const { select } = _options;
        const query = docModels.InstituteCategorization.find(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function subCategories1(_filter = {}, _options = {}) {

        const _filterM = {}
        _filterM.root_cat = _filter.parentId
        _filterM.level = 1

        // const subCategories1Id = await docModels.InstituteCategorizationsMap.find(_filterM)
        //     .distinct('child_id')

        // const { select } = _options
        // const query = docModels.InstituteCategorization.find(
        //     { id: subCategories1Id, status: true }
        // )
        // if (select) query.select(select)
        // return query.lean().exec()        

        const query = docModels.InstituteCategorizationsMap.aggregate([
            { $match: { "parent_id": _filter.parentId } },
            {
                $lookup: {
                    from: "institute_categorizations", // collection name in db
                    localField: "child_id",
                    foreignField: "id",
                    as: "subCategories1"
                }
            },
            //{ $project: { 'subCategories1Id.name': 1, 'subCategories1Id.id': 1, } },
            //{ $project: { 'subCategories1.name': 1, 'subCategories1.id': 1, } },
            {
                $project: {
                    _id: 0,
                    id: '$subCategories1.id',
                    child_id: '$child_id',
                    name: '$subCategories1.name'
                }
            },
        ])
        return query
    }

    async function dbInfo() {
      const collectionName = await docModels.InstituteCategorization.collection
        .collectionName;
      return { collectionName: collectionName };
    }

    return Object.freeze({
        findOne,
        findAll,
        insert,
        insertMany,
        updateOne,
        drop,
        findOne_SQ,
        findAll_SQ,
        parentTypes,
        subCategories1,
        dbInfo
    })
}