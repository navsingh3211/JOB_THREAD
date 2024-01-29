import { sequelize, DataTypes } from '../../config/sequelize.js'

const EmployerInvitedEmployee = sequelize.define('employer_invited_employee', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    encrypted_id: DataTypes.STRING,
    employer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'institution_companies',
            key: 'id',
        }
    },    
    seeker_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'jobseeker',
            key: 'id',
        }
    },
    seeker_prefId: DataTypes.BIGINT,
    preference_snapshot: DataTypes.TEXT,
    job_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'job_post',
            key: 'id',
        }
    },
    is_seeker_rejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    seeker_rejection_date: DataTypes.DATEONLY,
    is_shortlisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    is_removed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    is_viewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },

    profileRelevance_score: DataTypes.DECIMAL(5, 2),
    lastActivity_score: DataTypes.DECIMAL(5, 2),
    experience_score: DataTypes.DECIMAL(5, 2),
    noticePeriod_score: DataTypes.DECIMAL(5, 2),
    salary_score: DataTypes.DECIMAL(5, 2),
    skills_score: DataTypes.DECIMAL(5, 2),
    profileRelevance_score_isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    lastActivity_score_isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    experience_score_isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    noticePeriod_score_isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    salary_score_isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    skills_score_isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    isRejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    is_perfectmatch: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    is_processed: {
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
        tableName: 'employer_invited_employee',
        timestamps: false,
    }
)
export default EmployerInvitedEmployee