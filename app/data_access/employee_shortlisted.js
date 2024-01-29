export default function makeEmployeeShortlistedDB(docModels, sqMmodels) {
	async function findOne(_filter) {
		const query = docModels.EmployeeShortlisted.findOne(_filter);
		return query.lean().exec();
	}

	async function findAll(_filter = {}, _options = {}) {
		const { populate, select } = _options;
		const query = docModels.EmployeeShortlisted.find(_filter);
		if (select) query.select(select);
		if (_options.distinct) query.distinct(_options.distinct);
		if (populate) _.forEach(populate || [], (p) => query.populate(p));
		return query.lean().exec();
	}

	async function aggregate(pipeline = []) {
		return docModels.EmployeeShortlisted.aggregate(pipeline)
	}

	async function insert({ ...info }) {
		return docModels.EmployeeShortlisted.create({ ...info });
	}

	async function insertMany(items) {
		return docModels.EmployeeShortlisted.insertMany(items);
	}

	async function updateOne(_filter, update, options = {}) {
		return await docModels.EmployeeShortlisted.findOneAndUpdate(
			_filter,
			update,
			options
		);
	}

	async function drop() {
		return await docModels.EmployeeShortlisted.collection.drop();
	}

	async function findOne_SQ(_filter = {}) {
		const project = await sqMmodels.EmployeeShortlisted.findOne({
			where: _filter,
		});
		return project;
	}

	async function findAll_SQ(_filter = {}, _options = {}) {
		const project = await sqMmodels.EmployeeShortlisted.findAll({
			raw: true,
			where: _filter,
			..._options,
		});
		return project;
	}

	return Object.freeze({
		findOne,
		findAll,
		aggregate,
		insert,
		insertMany,
		updateOne,
		drop,
		findOne_SQ,
		findAll_SQ,
	});
}
