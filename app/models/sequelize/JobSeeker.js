import { sequelize, DataTypes } from '../../config/sequelize.js'
import SeekerLanguage from './SeekerLanguage.js'

const JobSeeker = sequelize.define('jobseeker', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seekerid: DataTypes.STRING,
    ref_code: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    countrycode: DataTypes.STRING,
    mobile: DataTypes.STRING,
    is_mobile_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    email: DataTypes.STRING,
    is_email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    password: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.STRING,
    marital_status: DataTypes.STRING,
    country: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    pincode: DataTypes.STRING,
    photo: DataTypes.STRING,
    blurred_photo: DataTypes.STRING,
    identity_proof: DataTypes.STRING,
    resume: DataTypes.STRING,
    is_resume_renamed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    is_resume_uploaded_mail_trigger: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    video_resume: DataTypes.STRING,
    video_resume_screen: DataTypes.STRING,
    video_resume_screen_blurred: DataTypes.STRING,
    prof_description: DataTypes.TEXT,
    linkedin_link: DataTypes.STRING,
    twitter_link: DataTypes.STRING,
    facebook_link: DataTypes.STRING,
    instagram_link: DataTypes.STRING,
    highest_education: DataTypes.INTEGER,
    profileCompletionStatus: DataTypes.INTEGER,
    profileCompletionLog: DataTypes.TEXT,
    isProfileCompleteMailtriggered: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    filename: DataTypes.TEXT,
    is_experienced: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
    },
    is_verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    notification_alert: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    job_alert_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    job_suggestions_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    newsletter_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    promotional_mail_notification: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    last_login: DataTypes.DATE,
    last_active: DataTypes.DATE,
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
    lastEditedOn:DataTypes.DATE,
    profileCompleteMailDate: DataTypes.DATE,
    resume_uploading_mail_triggerDate: DataTypes.DATE,
    resume_uploading_date: DataTypes.DATE,
    is_profile_completion_status_updated: DataTypes.BOOLEAN,
    is_mail_triggred_for_job_preference_incomplete: DataTypes.BOOLEAN,
    mail_triggered_date_for_preference_incomplete: DataTypes.DATE,
    is_mobile_triggred_for_job_preference_incomplete: DataTypes.INTEGER,
    mobile_triggered_date_for_preference_incomplete: DataTypes.DATE,
},
    {
        tableName: 'jobseeker',
        timestamps: false,
    }
)

JobSeeker.hasMany(SeekerLanguage, { as: 'languages', foreignKey: 'seeker_id' })

export default JobSeeker