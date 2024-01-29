import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        seeker_id: {
            type: Number,
            index: true
        },
        skill_id: {
            type: Number,
            index: true
        },
        name: {
            type: String
        },
        skill_isother: {
            type: Boolean,
            default: false
        },
        skill_other: String,
        status: {
            type: Boolean,
            default: true,
            index: true
        },
        created_on: Date,
        last_updated_on: Date,
        deleted_on: Date,
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
_schema.index({ id: 1, status: 1 })
_schema.index({ seeker_id: 1, status: 1 })
export default model('SeekerSkill', _schema, 'seeker_skills')