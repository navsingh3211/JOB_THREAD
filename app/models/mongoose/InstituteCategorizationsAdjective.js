import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
            index: true
        },
        category_id: {
            type: Number,
            index: true
        },
        adjective: {
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
        isDeleted: { type: Boolean, select: false },
        deletedAt: { type: Date, select: false }
    },
    {
        timestamps: true
    }
)
_schema.index({ category_id: 1, status: 1 })
export default model('InstituteCategorizationsAdjective', _schema, 'institute_categorizations_adjectives')