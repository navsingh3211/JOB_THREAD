import { sequelize, DataTypes } from '../../config/sequelize.js'

const SeekerSkill = sequelize.define('jobseeker_skill', {
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
    skill_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    skill_isother: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    skill_other: DataTypes.STRING,
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'jobseeker_skill',
        timestamps: false,
    }
)

export default SeekerSkill
