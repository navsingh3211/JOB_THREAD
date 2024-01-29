import { sequelize, DataTypes } from "../../config/sequelize.js";

const SeekerAppliedJob = sequelize.define("seeker_applied_job",
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		folder_id: {
			type: DataTypes.BIGINT,
		},
		job_id: {
			type: DataTypes.BIGINT,
		},
		seeker_id: {
			type: DataTypes.BIGINT,
		},
		preference_id: {
			type: DataTypes.BIGINT,
		},
		preference_snapshot: {
			type: DataTypes.TEXT,
		},
		applied_date: {
			type: DataTypes.DATE,
		},
		applied_through: {
			type: DataTypes.BOOLEAN,
		},
		experience: {
			type: DataTypes.INTEGER,
		},
		min_salary: {
			type: DataTypes.INTEGER,
		},
		city: {
			type: DataTypes.INTEGER,
		},
		is_viewed: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		viewed_on: {
			type: DataTypes.DATE,
		},
		is_shortlisted: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		is_rejected: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		is_interviewed: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		profileRelevance_score: DataTypes.DECIMAL(10, 2),
		lastActivity_score: DataTypes.DECIMAL(10, 2),
		experience_score: DataTypes.DECIMAL(10, 2),
		noticePeriod_score: DataTypes.DECIMAL(10, 2),
		salary_score: DataTypes.DECIMAL(10, 2),
		skills_score: DataTypes.DECIMAL(10, 2),
		profileRelevance_score_isRejected: {
			type: DataTypes.BOOLEAN,
		},
		lastActivity_score_isRejected: {
			type: DataTypes.BOOLEAN,
		},
		experience_score_isRejected: {
			type: DataTypes.BOOLEAN,
		},
		noticePeriod_score_isRejected: {
			type: DataTypes.BOOLEAN,
		},
		salary_score_isRejected: {
			type: DataTypes.BOOLEAN,
		},
		skills_score_isRejected: {
			type: DataTypes.BOOLEAN,
		},
		isRejected: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		is_perfectmatch: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		is_processed: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		isScoreProcessed: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: 1,
		},
		created_on: {
			type: DataTypes.DATE,
		},
		last_updated_on: {
			type: DataTypes.DATE,
			defaultValue: null,
		},
		deleted_on: {
			type: DataTypes.DATE,
			defaultValue: null,
		},
		salesforce_data_push_flag: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
	},
	{
		tableName: "seeker_applied_job",
		timestamps: false,
		indexes: [
			{ unique: false, fields: ["id"] },
			{ unique: false, fields: ["job_id"] },
			{ unique: false, fields: ["seeker_id"] },
			{ unique: false, fields: ["city"] },
			{ unique: false, fields: ["preference_id"] },
			{ unique: false, fields: ["folder_id"] },
			{ unique: false, fields: ["applied_through"] },
			{ unique: false, fields: ["is_viewed"] },
			{ unique: false, fields: ["viewed_on"] },
			{ unique: false, fields: ["is_shortlisted"] },
			{ unique: false, fields: ["is_rejected"] },
			{ unique: false, fields: ["is_interviewed"] },
			{ unique: false, fields: ["profileRelevance_score_isRejected"] },
			{ unique: false, fields: ["lastActivity_score_isRejected"] },
			{ unique: false, fields: ["experience_score_isRejected"] },
			{ unique: false, fields: ["noticePeriod_score_isRejected"] },
			{ unique: false, fields: ["salary_score_isRejected"] },
			{ unique: false, fields: ["skills_score_isRejected"] },
			{ unique: false, fields: ["isRejected"] },
			{ unique: false, fields: ["is_perfectmatch"] },
			{ unique: false, fields: ["is_processed"] },
			{ unique: false, fields: ["isScoreProcessed"] },
			{ unique: false, fields: ["status"] },
			{ unique: false, fields: ["created_on"] },
			{ unique: false, fields: ["last_updated_on"] },
			{ unique: false, fields: ["deleted_on"] },
			{ unique: false, fields: ["salesforce_data_push_flag"] },
		],
	}
);
export default SeekerAppliedJob;
