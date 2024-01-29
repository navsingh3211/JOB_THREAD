export default function makeEmployerInstituteDB(docModels, sqMmodels) {

    async function findOne(_filter = {}, _options = {}) {
        const { select } = _options
        const query = docModels.EmployerInstitute.findOne(_filter)
        if (select) query.select(select)
        return query.lean().exec()
    }

    async function findAll(_filter = {}, _options = {}) {
        const { populate, select } = _options;
        const query = docModels.EmployerInstitute.find(_filter)
        if (select) query.select(select)
        if (_options.distinct) query.distinct(_options.distinct)
        if (populate) _.forEach(populate || [], (p) => query.populate(p))
        return query.lean().exec()
    }

    async function insert({ ...jobInfo }) {
        return docModels.EmployerInstitute.create({ ...jobInfo })
    }

    async function insertMany(titles) {
        return docModels.EmployerInstitute.insertMany(titles)
    }

    async function updateOne(_filter, update, options = {}) {
        return await docModels.EmployerInstitute.findOneAndUpdate(_filter, update, options);
    }

    async function drop() {
        return await docModels.EmployerInstitute.collection.drop()
    }

    async function findOne_SQ(_filter = {}) {
        const project = await sqMmodels.InstitutionCompanyProfile.findOne({ where: _filter })
        return project
    }

    async function findAll_SQ(_filter = {}, _options = {}) {
        const project = await sqMmodels.InstitutionCompanyProfile.findAll({
            nest: true,
            //raw: true,
            include: [{
                model: sqMmodels.InstitutionCompanyCoursesOffered,
                as: 'courses'
            }],
            where: _filter,
            ..._options
        })
        return JSON.parse(JSON.stringify(project))
    }

    async function aggregate(pipeline = []) {
        return docModels.EmployerInstitute.aggregate(pipeline)
    }

    async function dbInfo() {
      const collectionName = await docModels.EmployerInstitute.collection
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
        aggregate,
        dbInfo
    })
}