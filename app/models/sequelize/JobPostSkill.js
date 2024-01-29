import { sequelize, DataTypes } from '../../config/sequelize.js'

const JobPostSkill = sequelize.define('job_post_skill', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    job_id: DataTypes.BIGINT,
    skill_id: DataTypes.INTEGER,
    skill_name: DataTypes.STRING,
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'job_post_skill',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['job_id'] },
            { unique: false, fields: ['skill_id'] },
            { unique: false, fields: ['status'] },
        ]
    }
)
export default JobPostSkill