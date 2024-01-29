import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        seeker_id: {
            type: Number,
            index: true
        },
        seekerId: {
            type: Schema.Types.ObjectId,
            ref: 'JobSeeker'
        },
        job_category: { type: Number, index: true },
        institution_cat: { type: Number, index: true },
        institution_cat_other: String,
        institution_subcat: { type: Number, index: true },
        institution_subcat_other: String,
        institution_subcat2: { type: Number, index: true },
        role: { type: Number, index: true },
        role_isother: { type: Boolean, default: 0 },
        role_other: String,
        subjects: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    auto: true
                },
                id: Number,
                seeker_id: Number,
                experience_id: Number,
                priority_order: Number,
                subject: Number,
                subject_other: String,
                status: { type: Number, default: 1 },
                under_vetting: { type: Number },
                created_on: Date,
                last_updated_on: Date,
                deleted_on: Date,
                isDeleted: { type: Boolean, select: false },
                deletedAt: { type: Date, select: false, },
            }, { timestamps: true }
        ],
        title: String,
        employment_type: Number,
        institute_name: String,
        country: Number,
        state: Number,
        city: { type: Number, index: true },
        started_from: Date,
        ended_to: Date,
        current_salary: Number,
        current_company: {
            type: String,
            enum: ["Yes", "No"],
        },
        result_type: String,
        notice_period: Number,
        key_responsibilites: String,
        status: {
            type: Number,
            enum: [1, 0],
            default: 1,
            index: true
        },
        under_vetting: {
            type: Number,
            enum: [0, 1, 2, 3] //1=active under vetting, 2=accepted, 3=rejected
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
        isDeleted: { type: Boolean, select: false },
        deletedAt: { type: Date, select: false },
    },
    {
        timestamps: true
    }
)
_schema.index({ id: 1, status: 1 })
_schema.index({ seeker_id: 1, status: 1 })
export default model('SeekerExperience', _schema, 'seeker_experiences')