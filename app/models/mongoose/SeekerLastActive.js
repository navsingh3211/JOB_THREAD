import { Schema, model } from '../../config/mongoose.js'

const _schema = new Schema(
    {
        seeker_id: {
            type: Number,
            required: true,
            index: { unique: true },
        },
        socketId: {
            type: String,
            index: true
        },
        lastActive: {
            type: Date
        },
        isActive: {
            type: Boolean
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
_schema.index({ seeker_id: 1, isDeleted: 1 })
export default model('SeekerLastActive', _schema, 'seeker_last_active')