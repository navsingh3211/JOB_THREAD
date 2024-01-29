import { sequelize, DataTypes } from '../../config/sequelize.js'

const InstitutionCompany = sequelize.define('institution_companies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ref_code: {
        type: DataTypes.STRING
    },
    directory: DataTypes.STRING,
    company_name: DataTypes.STRING,
    legalentity_name: DataTypes.STRING,
    address: DataTypes.TEXT,
    gst_number: DataTypes.STRING,
    countrycode: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    founded_year: DataTypes.STRING,
    company_logo: DataTypes.STRING,
    company_url: DataTypes.STRING,
    company_description: DataTypes.TEXT,
    cp_name: DataTypes.STRING,
    cp_designation: DataTypes.STRING,
    cp_phone: DataTypes.STRING,
    cp_email: DataTypes.STRING,
    admin_approval: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_mobile_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    token: DataTypes.STRING,
    profile_completion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password_reset_code: DataTypes.STRING,
    credit_points: DataTypes.INTEGER,
    last_ip: DataTypes.STRING,
    security: {
        type: DataTypes.BOOLEAN,
        defaultValue: 2
    },
    receive_promotional_mail: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
    mail_sent_date: DataTypes.DATE,
    slug: DataTypes.STRING,
    employerid: DataTypes.STRING,
    company_type: DataTypes.STRING,
    is_mobile_manual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_email_manual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_mobile_changed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_date: DataTypes.DATE,
    wallet_low_balance_mail_date: DataTypes.DATE,
    updated_date: DataTypes.DATE,
    is_mail_triggred_for_job_post_signup: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    mail_triggered_date_for_job_post_signup: DataTypes.DATE,
},
    {
        tableName: 'institution_companies',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['ref_code'] },
            { unique: false, fields: ['company_name'] },
            { unique: false, fields: ['phone'] },
            { unique: false, fields: ['email'] },
            { unique: false, fields: ['is_verify'] },
            { unique: false, fields: ['is_mobile_verified'] },
            { unique: false, fields: ['status'] },
            { unique: false, fields: ['created_on'] },
            { unique: false, fields: ['last_updated_on'] },
            { unique: false, fields: ['deleted_on'] },
            { unique: false, fields: ['employerid'] },
            { unique: false, fields: ['company_type'] },
            { unique: false, fields: ['is_mobile_manual'] },
            { unique: false, fields: ['is_email_manual'] },
            { unique: false, fields: ['is_mobile_changed'] },
            { unique: false, fields: ['is_email_changed'] },
        ]
    }
)
export default InstitutionCompany