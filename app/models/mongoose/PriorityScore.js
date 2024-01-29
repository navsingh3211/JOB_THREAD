import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        searchpriority: {
            type: Number,
            index: true
        },
        highest: {
            type: Number
        },
        lowest: {
            type: Number
        },
    },
    {
        timestamps: true
    }
)
export default model('PriorityScore', _schema, 'priority_scores')