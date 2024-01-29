import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        ref_code: {
            type: String,
            default: null,
        },
        admin_id: {
            type: Number,
            default: null,
        },
        employer_id: {
            type: Number,
            default: null,
            index: true
        },
        ref_employerid: {
            type: String
        },
        institute_profile_id: {
            type: Number,
            default: null,
            index: true
        },
        for_entire_group: {
            type: Boolean,
            index: true
        },
        title: {
            type: String,
            default: null
        },
        is_customtitle: {
            type: Boolean
        },
        customtitle: {
            type: String
        },
        slug: {
            type: String
        },
        meta_title: {
            type: String
        },
        description: {
            type: String
        },
        job_category: {
            type: Number,
            index: true
        },
        institution_cat: {
            type: Number,
            index: true
        },
        institution_subcat: {
            type: Number,
            index: true
        },
        institution_subcat_other: {
            type: String
        },
        institution_subcat2: {
            type: Number,
            index: true
        },
        institution_subcat2_other: {
            type: String
        },
        subject: {
            type: Number,
            index: true
        },
        is_subjectother: {
            type: Boolean
        },
        subject_other: {
            type: String
        },
        role: {
            type: Number,
            index: true
        },
        is_roleother: {
            type: Boolean,
        },
        role_other: {
            type: String
        },
        employment_type: {
            type: Number
        },
        min_education: {
            type: Number
        },
        is_minimum_education_required_dirty: {
            type: Boolean,
            select: false,
        },
        min_experience: {
            type: Number
        },
        max_salary: {
            type: Number
        },
        notice_period: {
            type: Number
        },
        vacancies: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    auto: true
                },
                id: { type: Number, required: true },
                job_id: Number,
                country: Number,
                state: Number,
                city: Number,
                total_positions: Number,
                status: { type: Boolean },
                created_on: Date,
                last_updated_on: Date,
                deleted_on: Date,
                isDeleted: { type: Boolean, select: false },
                deletedAt: { type: Date, select: false }
            }, { timestamps: true }
        ],
        skills: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    auto: true
                },
                id: { type: Number, required: true },
                job_id: Number,
                skill_id: Number,
                skill_name: String,
                status: { type: Boolean },
                created_on: Date,
                last_updated_on: Date,
                deleted_on: Date,
                isDeleted: { type: Boolean, select: false },
                deletedAt: { type: Date, select: false }
            }, { timestamps: true }
        ],
        start_of_life_date: {
            type: Date
        },
        publish_count: {
            type: Number
        },
        force_to_process_queue: {
            type: Date,
            select: false,
        },
        beginning_date: {
            type: Date
        },
        expiry_date: {
            type: Date
        },
        extendable_date: {
            type: Date
        },
        end_of_life_date: {
            type: Date
        },
        is_featured: {
            type: Boolean
        },
        is_private: {
            type: Boolean
        },
        total_applications_received: {
            type: Number,
            select: false,
        },
        had_saved_candidate: {
            type: Boolean,
            select: false,
        },
        search_in: {
            type: Boolean,
            default: true
        },
        system_title: {
            type: String
        },
        totalPerfectCount: {
            type: Number,
            select: false,
        },
        totalImperfectCount: {
            type: Number,
            select: false,
        },
        status: {
            type: Number,
            min: -1,
            max: 3,
            default: 1,
            index: true
        },
        is_processed_for_mail_trigger: {
            type: Boolean,
            select: false,
        },
        under_vetting: {
            type: Number,
            min: 1,
            max: 3,
        },
        created_on: {
            type: Date,
            //default: Date.now
        },
        last_updated_on: {
            type: Date
        },
        deleted_on: {
            type: Date
        },
        job_id: {
            type: String,
            index: true
        },
        is_lifeCycle_complete_mail_triggred: {
            type: Boolean,
            select: false,
        },
        expiry_notification_sent: {
            type: Number,
            select: false,
        },
        expiry_reminder_notification_sent: {
            type: Number,
            select: false,
        },
        manual_repost_count: {
            type: Number,
            select: false,
        },
        parent_job_id: {
            type: Number,
            select: false,
        },
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
_schema.index({ job_id: 1, status: 1 })
_schema.index({ employer_id: 1, institute_profile_id: 1, status: 1 })
export default model('JobPost', _schema, 'job_posts')