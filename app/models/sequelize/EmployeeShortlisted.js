import { sequelize, DataTypes } from '../../config/sequelize.js'

const EmployeeShortlisted = sequelize.define("employee_shortlisted",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		employer_id: {
			type: DataTypes.INTEGER,
		},
		institution_id: {
			type: DataTypes.INTEGER,
		},
		seeker_id: {
			type: DataTypes.BIGINT,
		},
		seeker_prefId: {
			type: DataTypes.BIGINT,
		},
		preference_snapshot: {
			type: DataTypes.TEXT,
		},
		job_id: {
			type: DataTypes.BIGINT,
		},
		final_status: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		is_selected: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		is_rejected: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		is_hold: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		pinned: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		comments: {
			type: DataTypes.TEXT,
		},
		recommended: {
			type: DataTypes.STRING,
		},
		action_date: {
			type: DataTypes.DATE,
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
		is_mail_triggred_for_online_event_cancelled: {
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
	},
	{
		tableName: "employee_shortlisted",
		timestamps: false,
		indexes: [
			{ unique: false, fields: ["id"] },
			{ unique: false, fields: ["employer_id"] },
			{ unique: false, fields: ["institution_id"] },
			{ unique: false, fields: ["job_id"] },
			{ unique: false, fields: ["seeker_id"] },
			{ unique: false, fields: ["seeker_prefId"] },
			{ unique: false, fields: ["final_status"] },
			{ unique: false, fields: ["is_selected"] },
			{ unique: false, fields: ["is_rejected"] },
			{ unique: false, fields: ["is_hold"] },
			{ unique: false, fields: ["pinned"] },
			{ unique: false, fields: ["status"] },
			{ unique: false, fields: ["action_date"] },
			{ unique: false, fields: ["created_on"] },
			{ unique: false, fields: ["last_updated_on"] },
			{ unique: false, fields: ["deleted_on"] },
		],
	}
);

export default EmployeeShortlisted