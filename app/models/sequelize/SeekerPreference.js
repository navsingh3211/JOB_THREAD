import { sequelize, DataTypes } from '../../config/sequelize.js'
import PreferenceLocation from './PreferenceLocation.js'

const SeekerPreference = sequelize.define('seeker_jobpreference', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    ref_code: DataTypes.STRING,
    seeker_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'jobseeker', // refers to table name
            key: 'id', // 'id' refers to column name in jobseeker table
        }
    },
    job_category: DataTypes.INTEGER,
    job_role: DataTypes.INTEGER,
    role_isother: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    job_role_other: DataTypes.STRING,
    institution_cat: DataTypes.INTEGER,
    institution_cat_any: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    institution_subcat: DataTypes.INTEGER,
    institution_subcat2: DataTypes.INTEGER,
    title: DataTypes.STRING,
    is_customtitle: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    customtitle: DataTypes.STRING,
    is_actively_searching: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    experience: DataTypes.INTEGER,
    min_salary: DataTypes.INTEGER,
    employment_type: DataTypes.INTEGER,
    subject: DataTypes.INTEGER,
    subject_isother: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    subject_other: DataTypes.STRING,
    system_title: DataTypes.STRING,
    is_of_save: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    is_of_apply: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    under_vetting: { type: DataTypes.BOOLEAN, defaultValue: null },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'seeker_jobpreference',
        timestamps: false,
    }
)

SeekerPreference.hasMany(PreferenceLocation, { as: 'locations', foreignKey: 'jobpreference_id' })

export default SeekerPreference
