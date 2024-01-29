import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        search_keyword: {
            type: String,
            required: true,
            index: { unique: true }
        },
        suggested_title: [{ type: String }],
        status: {
            type: Boolean,
            default: true,
            index: true
        },
        created_on: {
            type: Date
        },
        isDeleted: { type: Boolean, select: false },
        deletedAt: { type: Date, select: false }
    },
    {
        timestamps: true
    }
)
_schema.index({ search_keyword: 1, status: 1 })
export default model('JobTitleSuggestion', _schema, 'job_title_suggestions')