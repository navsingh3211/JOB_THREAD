import { sequelize, DataTypes } from '../../config/sequelize.js'

const SeekerExperienceSubject = sequelize.define('seeker_experience_subject', {
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
    experience_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'seeker_experience',
            key: 'id',
        }
    },
    priority_order: DataTypes.INTEGER,
    subject: DataTypes.INTEGER,
    subject_other: DataTypes.STRING,
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'seeker_experience_subject',
        timestamps: false,
    }
)

export default SeekerExperienceSubject
