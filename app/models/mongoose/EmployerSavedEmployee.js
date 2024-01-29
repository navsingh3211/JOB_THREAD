import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        employer_id: {
            type: Number,
            index: true
        },
        institution_id: {
            type: Number,
            index: true
        },
        seeker_id: {
            type: Number,
            index: true
        },
        seeker_prefId: Number,
        preference_snapshot: String,
        job_id: {
            type: Number,
            index: true
        },
        profileRelevance_score: { type: Schema.Types.Decimal128 },
        lastActivity_score: { type: Schema.Types.Decimal128 },
        experience_score: { type: Schema.Types.Decimal128 },
        noticePeriod_score: { type: Schema.Types.Decimal128 },
        salary_score: { type: Schema.Types.Decimal128 },
        skills_score: { type: Schema.Types.Decimal128 },
        profileRelevance_score_isRejected: {
            type: Boolean,
            default: 0
        },
        lastActivity_score_isRejected: {
            type: Boolean,
            default: 0
        },
        experience_score_isRejected: {
            type: Boolean,
            default: 0
        },
        noticePeriod_score_isRejected: {
            type: Boolean,
            default: 0
        },
        salary_score_isRejected: {
            type: Boolean,
            default: 0
        },
        skills_score_isRejected: {
            type: Boolean,
            default: 0
        },
        isRejected: {
            type: Boolean,
            default: 0
        },
        is_perfectmatch: {
            type: Number,
            default: 0
        },
        is_processed: {
            type: Boolean,
            default: 0
        },
        status: {
            type: Boolean,
            default: 1,
            index: true
        },
        created_on: {
            type: Date
        },
        last_updated_on: {
            type: Date
        },
        deleted_on: {
            type: Date
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
_schema.index({ seeker_id: 1, seeker_prefId: 1, job_id: 1, status: 1 })
_schema.index({ employer_id: 1,  seeker_prefId: 1, job_id: 1, status: 1 })
export default model('EmployerSavedEmployee', _schema, 'employer_saved_employees')