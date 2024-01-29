import { Schema, model } from "../../config/mongoose.js";

const Education = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true },
        },
        slug: {
            type: String,
        },
        type: {
            type: String,
        },
        education_order: {
            type: Number,
        },
        education_scope: {
            type: Number,
        },
        status: {
            type: Boolean,
            default: true,
            index: true
        },
        created_on: {
            type: Date,
        },
        last_updated_on: {
            type: Date,
        },
        deleted_on: {
            type: Date,
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
        timestamps: true,
    }
)
Education.index({ id: 1, status: 1 })
export default model("Education", Education, "educations");
