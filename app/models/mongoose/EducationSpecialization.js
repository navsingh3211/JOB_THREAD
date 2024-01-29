import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        education_id: {
            type: Number,
            index: true
        },
        name: {
            type: String
        },
        slug: {
            type: String
        },
        status: {
            type: Boolean,
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
_schema.index({ id: 1, status: 1 })
_schema.index({ education_id: 1, status: 1 })
export default model('EducationSpecialization', _schema, 'education_specializations')