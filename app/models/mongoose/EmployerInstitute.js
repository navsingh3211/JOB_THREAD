import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        emplyerId: {
            type: Schema.Types.ObjectId,
            ref: 'Employer'
        },
        ref_code: { type: String },
        institution_company_id: {
            type: Number,
            index: true
        },
        institution_name: String,
        institution_logo: {
            type: String,
            // get: function (value) {
            //     return 'TEST'
            // }
        },
        institution_description: String,
        institution_cat: { type: Number, index: true },
        institution_subcat: { type: Number, index: true },
        institution_subcat_other: String,
        institution_subcat2: { type: Number, index: true },
        institution_subcat2_other: String,
        category_adjective_id: Number,
        ownership_type: {
            type: String,
            //enum: ['Parent Company of a brand', 'Franchisee of a brand', 'Not part of a brand (specify)']
        },
        ownership_brand: String,
        affiliation_with: String,
        affiliation_certificate: String, //takes S3 PATH
        no_of_branch: Number,
        employee_strength: Number,
        student_strength: Number,
        country: Number,
        state: Number,
        city: Number,
        pincode: Number,
        address: String,
        address_longitude: String,
        address_latitude: String,
        default_venue_addres: String,
        default_venue_addres_longitude: String,
        default_venue_addres_latitude: String,
        address_places_id: String,
        url: String,
        company_pan: String,
        company_gst: String,
        status: {
            type: Boolean,
            default: true,
            index: true
        },
        created_on: Date,
        last_updated_on: Date,
        deleted_on: Date,
        under_vetting: {
            type: Number,
            min: 0,
            max: 3,
            default: 0,
            index: true
            //1=under_vetting, 2=accepted, 3=rejected, [0,NULL] = Normal Entry
        },
        institute_name_vetting: {
            type: Number,
            min: 0,
            max: 2,
            default: 0,
            //0: approved institute name 1: under vetting 2: vetting rejected
        },
        courses: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    auto: true
                },
                id: Number,
                employer_id: Number,
                institute_id: Number,
                course_id: Number,
                course_name: String,
                course_isother: { type: Boolean, default: 0 },
                course_other: String,
                status: { type: Boolean },
                created_on: Date,
                last_updated_on: Date,
                deleted_on: Date,
                isDeleted: { type: Boolean, select: false },
                deletedAt: { type: Date, select: false }

            }, { timestamps: true }
        ],
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
)
_schema.index({ id: 1, status: 1 })
_schema.index({ institution_company_id: 1, status: 1 })
export default model('EmployerInstitute', _schema, 'employer_institutes')