import { sequelize, DataTypes } from "../../config/sequelize.js";

const EmployeeContactRevealed = sequelize.define(
	"employee_contact_revealed",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		seeker_id: {
			type: DataTypes.INTEGER,
		},
		employer_id: {
			type: DataTypes.INTEGER,
		},
		job_id: {
			type: DataTypes.INTEGER,
		},
		institution_id: {
			type: DataTypes.INTEGER,
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
		},
		deleted_on: {
			type: DataTypes.DATE,
		},
	},
	{
		tableName: "employee_contact_revealed",
		timestamps: false,
		indexes: [
			{ unique: false, fields: ["employer_id"] },
			{ unique: false, fields: ["institution_id"] },
			{ unique: false, fields: ["job_id"] },
			{ unique: false, fields: ["seeker_id"] },
			{ unique: false, fields: ["employer_id"] },
			{ unique: false, fields: ["status"] },
			{ unique: false, fields: ["created_on"] },
			{ unique: false, fields: ["last_updated_on"] },
			{ unique: false, fields: ["deleted_on"] },
		],
	}
);

export default EmployeeContactRevealed;
