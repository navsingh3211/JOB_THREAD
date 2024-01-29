import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        category_id: {
            type: Number,
            index: true
        },
        no_of_levels: {
            type: Number,
            default: 0
        },
        level_names: {
            type: String
        },
        level_to_define_domain: {
            type: Number
        },
        has_courses_offered: {
            type: Number,
            default: 0
        },
        has_adjective: {
            type: Number,
            default: 0
        },
        levels_to_show_in_jobcard: {
            type: String
        },
        title_conjunction: {
            type: String
        },
        title_format_academic: {
            type: String
        },
        title_format_nonacademic: {
            type: String
        },
        status: {
            type: Boolean,
            default: 1,
            index: true
        },
        created_on: {
            type: Date,
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
_schema.index({ category_id: 1, status: 1 })
export default model('InstituteCategorizationsRootConfig', _schema, 'institute_categorizations_root_configs')