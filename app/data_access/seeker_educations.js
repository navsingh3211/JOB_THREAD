export default function makeSeekerEducationDB(docModels, sqMmodels) {
  async function findOne(_filter = {}, _options = {}) {
    const { select } = _options;
    const query = docModels.SeekerEducation.findOne(_filter);
    if (select) query.select(select);
    return query.lean().exec();
  }

  async function findAll(_filter = {}, _options = {}) {
    const { populate, select } = _options;
    const query = docModels.SeekerEducation.find(_filter);
    if (select) query.select(select);
    if (_options.distinct) query.distinct(_options.distinct);
    if (populate) _.forEach(populate || [], (p) => query.populate(p));
    return query.lean().exec();
  }

  async function insert({ ...seekerEducationInfo }) {
    return docModels.SeekerEducation.create({ ...seekerEducationInfo });
  }

  async function insertMany(seekerEducations) {
    return docModels.SeekerEducation.insertMany(seekerEducations);
  }

  async function updateOne(_filter, update, options = {}) {
    return await docModels.SeekerEducation.findOneAndUpdate(_filter, update, options);
  }

  async function drop() {
    return await docModels.SeekerEducation.collection.drop();
  }

  async function findOne_SQ(_filter = {}) {
    const project = await sqMmodels.SeekerEducation.findOne({ where: _filter });
    return project;
  }

  async function findAll_SQ(_filter = {}, _options = {}) {
    const project = await sqMmodels.SeekerEducation.findAll({
      raw: true,
      where: _filter,
      ..._options,
    });
    return project;
  }

  async function dbInfo() {
    const collectionName = await docModels.SeekerEducation.collection
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
    dbInfo,
  });
}
