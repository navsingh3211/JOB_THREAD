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
    },
    {
        timestamps: true
    }
)
_schema.index({ id: 1, status: 1 })
export default model('JobCategory', _schema, 'job_categories')