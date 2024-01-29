import { sequelize, DataTypes } from '../../config/sequelize.js'

const JobPostVacancy = sequelize.define('job_post_vacancies', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    job_id: DataTypes.BIGINT,
    country: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    total_positions: DataTypes.INTEGER,
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'job_post_vacancies',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['job_id'] },
            { unique: false, fields: ['country'] },
            { unique: false, fields: ['state'] },
            { unique: false, fields: ['city'] },
            { unique: false, fields: ['status'] },
        ]
    }
)
export default JobPostVacancy