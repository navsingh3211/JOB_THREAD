import { sequelize, DataTypes } from '../../config/sequelize.js'
//import PreferenceLocation from './PreferenceLocation.js'
import SeekerExperienceSubject from './SeekerExperienceSubject.js'

const SeekerExperience = sequelize.define('seeker_experience', {
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
    job_category: DataTypes.INTEGER,
    institution_cat: DataTypes.INTEGER,
    institution_cat_other: DataTypes.STRING,
    institution_subcat: DataTypes.INTEGER,
    institution_subcat_other: DataTypes.STRING,
    institution_subcat2: DataTypes.INTEGER,
    role: DataTypes.INTEGER,
    role_isother: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    role_other: DataTypes.STRING,
    subject: DataTypes.INTEGER,
    subject_isother: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    subject_other: DataTypes.STRING,
    title: DataTypes.STRING,
    employment_type: DataTypes.INTEGER,
    institute_name: DataTypes.STRING,
    country: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    started_from: DataTypes.STRING,
    ended_to: DataTypes.STRING,
    current_salary: DataTypes.STRING,
    current_company: DataTypes.STRING,
    result_type: DataTypes.STRING,
    notice_period: DataTypes.INTEGER,
    key_responsibilites: DataTypes.TEXT,
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    under_vetting: { type: DataTypes.BOOLEAN, defaultValue: null },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'seeker_experience',
        timestamps: false,
    }
)

SeekerExperience.hasMany(SeekerExperienceSubject, { as: 'subjects', foreignKey: 'experience_id' })

export default SeekerExperience
