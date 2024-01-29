import { sequelize, DataTypes } from '../../config/sequelize.js'

const SeekerLanguage = sequelize.define('seeker_languages', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    seeker_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'jobseeker', // refers to table name
            key: 'id', // 'id' refers to column name in jobseeker table
        }
    },
    language: {
        type: DataTypes.INTEGER
    },
    language_isother: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    language_other: DataTypes.STRING,
    prof_reading: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    prof_writing: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    prof_speaking: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },    
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    created_on: {
        type: DataTypes.DATE
    },
    last_updated_on: {
        type: DataTypes.DATE
    },
    deleted_on: {
        type: DataTypes.DATE
    },
},
    {
        tableName: 'seeker_languages',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['seeker_id'] },
            { unique: false, fields: ['status'] },
        ]
    }
)
export default SeekerLanguage