import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        name: {
            type: String
        },
        slug: {
            type: String
        },
        is_root: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            min: 0,
            max: 1,
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
        reminiscent_id: {
            type: String
        },
        ref: {
            type: String
        },
        refid: {
            type: String
        },
        is_processed: {
            type: Boolean,
            default: false
        },
        is_featured: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)
_schema.index({ id: 1, status: 1 })
export default model('InstituteCategorization', _schema, 'institute_categorizations')