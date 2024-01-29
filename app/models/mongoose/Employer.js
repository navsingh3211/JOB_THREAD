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
            index: true
        },
        company_name: String,
        legalentity_name: String,
        address: String,
        gst_number: String,
        countrycode: String,
        phone: { type: Number, index: true },
        email: { type: String, lowercase: true, index: true },
        password: String,
        founded_year: Number,
        company_logo: {
            type: String,
            //get: company_logo => `---ddd${company_logo}`
        },
        company_url: String,
        company_description: String,
        cp_name: String,
        cp_designation: String,
        cp_phone: String,
        cp_email: { type: String, lowercase: true },
        is_verify: { type: Boolean, default: false, index: true },
        is_mobile_verified: { type: Boolean, default: false, index: true },
        last_ip: String,
        security: {
            type: Number,
            min: 1,
            max: 2,
            default: 2
        },
        receive_promotional_mail: { type: Boolean, default: true },
        status: {
            type: Boolean,
            default: true,
            index: true
        },
        created_on: Date,
        last_updated_on: Date,
        deleted_on: Date,
        mail_sent_date: Date,
        employerid: { type: String, index: { unique: true } },
        is_mobile_manual: Number,
        is_email_manual: Number,
        is_mobile_changed: Number,
        wallet_low_balance_mail_date: Date,
        is_mail_triggred_for_job_post_signup: Number,
        mail_triggered_date_for_job_post_signup: Date,
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
)
_schema.index({ id: 1, status: 1 })
_schema.index({ employerid: 1, status: 1 })
export default model('Employer', _schema, 'employers')