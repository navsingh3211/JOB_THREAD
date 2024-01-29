import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        seekerid: {
            type: String,
            index: { unique: true }
        },
        ref_code: String,
        first_name: String,
        last_name: String,
        countrycode: String,
        mobile: {
            type: Number,
            index: true
        },
        is_mobile_verified: {
            type: Boolean,
            default: 0,
        },
        email: {
            type: String,
            index: true
        },
        is_email_verified: {
            type: Boolean,
            default: 0,
        },
        password: String,
        dob: Date,
        gender: {
            type: String,
            //enum: [null, 'Female', 'Male']
        },
        marital_status: {
            type: String,
            //enum: [null, 'Single', 'Married', 'Divorced', 'Separated']
        },
        country: Number,
        state: Number,
        city: Number,
        address: String,
        pincode: Number,
        photo: String,
        blurred_photo: String,
        identity_proof: String,
        resume: String,
        is_resume_renamed: {
            type: Boolean,
            default: 0
        },
        is_resume_uploaded_mail_trigger: Number,
        video_resume: String,
        video_resume_screen: String,
        video_resume_screen_blurred: String,
        prof_description: String,
        linkedin_link: String,
        twitter_link: String,
        facebook_link: String,
        instagram_link: String,
        highest_education: Number,
        languages: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    auto: true
                },
                id: Number,
                seeker_id: Number,
                language: Number,
                language_isother: { type: Boolean, default: 0 },
                language_other: String,
                prof_reading: { type: Boolean, default: 0 },
                prof_writing: { type: Boolean, default: 0 },
                prof_speaking: { type: Boolean, default: 0 },
                status: { type: Boolean },
                created_on: Date,
                last_updated_on: Date,
                deleted_on: Date,
                isDeleted: { type: Boolean, select: false },
                deletedAt: { type: Date, select: false, },
            }, { timestamps: true }
        ],
        profileCompletionStatus: Number,
        profileCompletionLog: String,
        isProfileCompleteMailtriggered: Number,
        filename: String,
        is_experienced: {
            type: Boolean,
            default: null
        },
        is_verify: {
            type: Boolean,
            default: 0
        },
        notification_alert: {
            type: Boolean,
            default: 1
        },
        job_alert_notification: {
            type: Boolean,
            default: 1
        },
        job_suggestions_notification: {
            type: Boolean,
            default: 1
        },
        newsletter_notification: {
            type: Boolean,
            default: 1
        },
        promotional_mail_notification: {
            type: Boolean,
            default: 1
        },
        last_login: Date,
        last_active: Date,
        status: {
            type: Boolean,
            default: true,
            index: true
        },
        created_on: Date,
        last_updated_on: Date,
        deleted_on: Date,
        lastEditedOn: Date,
        profileCompleteMailDate: Date,
        resume_uploading_mail_triggerDate: Date,
        resume_uploading_date: Date,
        is_profile_completion_status_updated: {
            type: Boolean,
            default: 0
        },
        is_mail_triggred_for_job_preference_incomplete: {
            type: Boolean,
            default: 0
        },
        mail_triggered_date_for_preference_incomplete: Date,
        is_mobile_triggred_for_job_preference_incomplete: Number,
        mobile_triggered_date_for_preference_incomplete: Date,
        isDeleted: {
            type: Boolean,
            select: false
        },
        deletedAt: {
            type: Date,
            select: false,
        }
    },
    {
        timestamps: true
    }
)
_schema.index({ id: 1, status: 1 })
_schema.index({ seekerid: 1, status: 1 })
_schema.index({ email: 1, mobile: 1, status: 1 })
export default model('JobSeeker', _schema, 'jobseekers')