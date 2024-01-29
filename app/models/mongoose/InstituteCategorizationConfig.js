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
        area_of_operation: {
            type: Number,
            min: 1,
            max: 5,
            default: null,
            index: true
        },
        level_no: {
            type: Number
        },
        level_position: {
            type: Number
        },
        label: { type: String },
        data_unique_to_parent: {
            type: Boolean
        },
        data_dependancy_level: {
            type: Number,
            default: null
        },
        data_map_type: {
            type: Number,
            default: null
        },
        data_maping_table: {
            type: Number,
            default: null
        },
        allow_custom: {
            type: Boolean,
            default: 0
        },
        seq_in_search: {
            type: Boolean,
        },
        is_select_mandatory: {
            type: Boolean
        },
        is_input_dynamic: {
            type: Boolean
        },
        is_multi_entry: {
            type: Boolean
        },
        is_sch_matchmaker: {
            type: Boolean
        },
        is_sch_tiebreaker: {
            type: Boolean
        },
        status: {
            type: Number,
            min: 0,
            max: 1,
            default: 1,
            index: true
        },
        created_on: {
            type: Date,
            default: Date.now()
        },
        last_updated_on: {
            type: Date
        },
        deleted_on: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)
_schema.index({ id: 1, status: 1 })
_schema.index({ category_id: 1, area_of_operation: 1, status: 1 })
export default model('InstituteCategorizationConfig', _schema, 'institute_categorizations_configs')