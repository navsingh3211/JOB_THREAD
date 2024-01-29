import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        ref_code: String,
        seeker_id: {
            type: Number,
            index: true
        },
        seekerId: {
            type: Schema.Types.ObjectId,
            ref: 'JobSeeker'
        },
        job_category: {
            type: Number,
            index: true
        },
        job_role: {
            type: Number,
            index: true
        },
        role_isother: {
            type: Boolean,
            default: false
        },
        job_role_other: String,
        institution_cat: {
            type: Number,
            index: true
        },
        institution_cat_any: {
            type: Boolean,
            default: false
        },
        institution_subcat: {
            type: Number,
            index: true
        },
        institution_subcat2: {
            type: Number,
            index: true
        },
        title: String,
        is_customtitle: {
            type: Boolean,
            default: 0
        },
        customtitle: String,
        is_actively_searching: {
            type: Boolean,
            default: false
        },
        experience: {
            type: Number,
            index: true
        },
        min_salary: Number,
        employment_type: {
            type: Number,
            index: true
        },
        subject: {
            type: Number,
            index: true
        },
        subject_isother: {
            type: Boolean,
            default: false
        },
        subject_other: String,
        system_title: String,
        locations: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    auto: true
                },
                id: Number,
                seeker_id: Number,
                jobpreference_id: Number,
                country: Number,
                state: Number,
                status: { type: Boolean },
                created_on: Date,
                last_updated_on: Date,
                deleted_on: Date,
                isDeleted: { type: Boolean, select: false },
                deletedAt: { type: Date, select: false, },
                cities: [
                    {
                        _id: {
                            type: Schema.Types.ObjectId,
                            auto: true
                        },
                        id: Number,
                        seeker_id: Number,
                        location_id: Number,
                        state_id: Number,
                        city: Number,
                        status: { type: Boolean },
                        created_on: Date,
                        last_updated_on: Date,
                        deleted_on: Date,
                        isDeleted: { type: Boolean, select: false },
                        deletedAt: { type: Date, select: false }

                    }, { timestamps: true }
                ],

            }, { timestamps: true }
        ],
        is_of_save: { type: Boolean, default: false },
        is_of_apply: { type: Boolean, default: false },
        status: {
            type: Number,
            enum: [-1, -2, 1, 0], //-1=preference to apply job, , -2=preference to save job, 1=active, 0=inactive
            default: 1,
            index: true
        },
        under_vetting: {
            type: Number,
            enum: [1, 2, 3] //1=active under vetting, 2=accepted, 3=rejected
        },
        created_on: Date,
        last_updated_on: Date,
        deleted_on: Date,
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
_schema.index({ seeker_id: 1, status: 1 })
export default model('SeekerPreference', _schema, 'seeker_preferences')