import { sequelize, DataTypes } from "../../config/sequelize.js";

const SeekerEducation = sequelize.define("seeker_education",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        seeker_id: {
            type: DataTypes.BIGINT,
        },
        education_id: {
            type: DataTypes.INTEGER,
        },
        specialization: {
            type: DataTypes.INTEGER,
        },
        specialization_isother: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        specialization_other: {
            type: DataTypes.STRING,
        },
        cached_institute_id: {
            type: DataTypes.INTEGER,
        },
        institute_name: {
            type: DataTypes.STRING,
        },
        institute_isother: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        institute_other: {
            type: DataTypes.STRING,
        },
        course: {
            type: DataTypes.INTEGER,
        },
        course_type: {
            type: DataTypes.STRING,
        },
        starting_date: {
            type: DataTypes.STRING,
        },
        ending_date: {
            type: DataTypes.STRING,
        },
        course_duration: {
            type: DataTypes.STRING,
        },
        grading_system: {
            type: DataTypes.STRING,
        },
        grading_system_explanation: {
            type: DataTypes.STRING,
        },
        grade: {
            type: DataTypes.STRING,
        },
        board: {
            type: DataTypes.INTEGER,
        },
        board_isother: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        board_other: {
            type: DataTypes.STRING,
        },
        stream: {
            type: DataTypes.STRING,
        },
        school: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.INTEGER,
        },
        state: {
            type: DataTypes.INTEGER,
        },
        city: {
            type: DataTypes.INTEGER,
        },
        passing_year: {
            type: DataTypes.INTEGER,
        },
        aggregate: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        tableName: "seeker_education",
        timestamps: false,
        indexes: [
            { unique: false, fields: ["board"] },
            { unique: false, fields: ["course"] },
            { unique: false, fields: ["education_id"] },
            { unique: false, fields: ["course_type"] },
            { unique: false, fields: ["specialization"] },
            { unique: false, fields: ["stream"] },
            { unique: false, fields: ["seeker_id"] },
            { unique: false, fields: ["city"] },
            { unique: false, fields: ["country"] },
            { unique: false, fields: ["state"] },
            { unique: false, fields: ["status"] },
            { unique: false, fields: ["created_on"] },
            { unique: false, fields: ["last_updated_on"] },
            { unique: false, fields: ["deleted_on"] }
        ],
    }
);
export default SeekerEducation;
