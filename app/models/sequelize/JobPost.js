import { sequelize, DataTypes } from '../../config/sequelize.js'
import JobPostVacancy from './JobPostVacancy.js'
import JobPostSkill from './JobPostSkill.js'

const JobPost = sequelize.define('job_post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ref_code: {
        type: DataTypes.STRING
    },
    admin_id: {
        type: DataTypes.INTEGER
    },
    employer_id: {
        type: DataTypes.INTEGER
    },
    ref_employerid: {
        type: DataTypes.STRING
    },
    institute_profile_id: {
        type: DataTypes.INTEGER
    },
    for_entire_group: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    title: {
        type: DataTypes.STRING
    },
    is_customtitle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    customtitle: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
    meta_title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    job_category: {
        type: DataTypes.INTEGER
    },
    institution_cat: {
        type: DataTypes.INTEGER
    },
    institution_subcat: {
        type: DataTypes.INTEGER
    },
    institution_subcat_other: {
        type: DataTypes.STRING
    },
    institution_subcat2: {
        type: DataTypes.INTEGER
    },
    institution_subcat2_other: {
        type: DataTypes.STRING
    },
    subject: {
        type: DataTypes.INTEGER
    },
    is_subjectother: {
        type: DataTypes.BOOLEAN
    },
    subject_other: {
        type: DataTypes.STRING
    },
    employment_type: {
        type: DataTypes.INTEGER
    },
    min_education: {
        type: DataTypes.INTEGER
    },
    is_minimum_education_required_dirty: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    min_experience: {
        type: DataTypes.INTEGER
    },
    max_salary: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.INTEGER
    },
    is_roleother: {
        type: DataTypes.BOOLEAN,
    },
    role_other: {
        type: DataTypes.STRING
    },
    notice_period: {
        type: DataTypes.INTEGER
    },
    start_of_life_date: {
        type: DataTypes.DATE
    },
    publish_count: {
        type: DataTypes.BOOLEAN
    },
    force_to_process_queue: {
        type: DataTypes.DATE
    },
    beginning_date: {
        type: DataTypes.DATE
    },
    expiry_date: {
        type: DataTypes.DATE
    },
    extendable_date: {
        type: DataTypes.DATE
    },
    end_of_life_date: {
        type: DataTypes.DATE
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    total_applications_received: {
        type: DataTypes.INTEGER
    },
    had_saved_candidate: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    search_in: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    system_title: {
        type: DataTypes.STRING
    },
    totalPerfectCount: {
        type: DataTypes.INTEGER
    },
    totalImperfectCount: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    is_processed_for_mail_trigger: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    under_vetting: {
        type: DataTypes.BOOLEAN
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
    job_id: {
        type: DataTypes.STRING
    },
    is_lifeCycle_complete_mail_triggred: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    expiry_notification_sent: {
        type: DataTypes.INTEGER
    },
    expiry_reminder_notification_sent: {
        type: DataTypes.INTEGER
    },
    manual_repost_count: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    parent_job_id: {
        type: DataTypes.BIGINT
    }
},
    {
        tableName: 'job_post',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['min_education'] },
            { unique: false, fields: ['employment_type'] },
            { unique: false, fields: ['institution_cat'] },
            { unique: false, fields: ['employer_id'] },
            { unique: false, fields: ['institute_profile_id'] },
            { unique: false, fields: ['institution_subcat'] },
            { unique: false, fields: ['institution_subcat2'] },
            { unique: false, fields: ['job_category'] },
            { unique: false, fields: ['notice_period'] },
            { unique: false, fields: ['subject'] },
            { unique: false, fields: ['admin_id'] },
            { unique: false, fields: ['role'] },
            { unique: false, fields: ['for_entire_group'] },
            { unique: false, fields: ['is_minimum_education_required_dirty'] },
            { unique: false, fields: ['status'] },
            { unique: false, fields: ['start_of_life_date'] },
            { unique: false, fields: ['beginning_date'] },
            { unique: false, fields: ['extendable_date'] },
            { unique: false, fields: ['expiry_date'] },
            { unique: false, fields: ['end_of_life_date'] },
            { unique: false, fields: ['is_private'] },
            { unique: false, fields: ['search_in'] },
            { unique: false, fields: ['under_vetting'] },
            { unique: false, fields: ['job_id'] },
            { unique: false, fields: ['expiry_notification_sent'] },
            { unique: false, fields: ['expiry_reminder_notification_sent'] },
            { unique: false, fields: ['manual_repost_count'] },
            { unique: false, fields: ['parent_job_id'] },
            { unique: false, fields: ['title'] },
            { unique: false, fields: ['system_title'] },
            { unique: false, fields: ['description'] },
        ]
    }
)

JobPost.hasMany(JobPostVacancy, { as: 'vacancies', foreignKey: 'job_id' })
JobPost.hasMany(JobPostSkill, { as: 'skills', foreignKey: 'job_id' })

export default JobPost