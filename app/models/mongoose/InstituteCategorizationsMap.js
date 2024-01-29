import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        parent_id: {
            type: Number,
            index: true
        },
        child_id: {
            type: Number,
            index: true
        },
        level: {
            type: Number,
            index: true
        },
        root_cat: {
            type: Number,
            index: true
        },
        root_cat_1: {
            type: Number
        },
        root_cat_2: {
            type: Number
        },
        root_cat_3: {
            type: Number
        },
        created_on: {
            type: Date,
            default: Date.now()
        },
    },
    {
        timestamps: true
    }
)
_schema.index({ parent_id: 1, child_id: 1, root_cat: 1 })
export default model('InstituteCategorizationsMap', _schema, 'institute_categorizations_map')