import { Schema, model } from "../../config/mongoose.js";

const SeekerEducationSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true }
        },
        seeker_id: {
            type: Number,
            index: true,
        },
        seekerId: {
            type: Schema.Types.ObjectId,
            ref: 'JobSeeker'
        },
        education_id: {
            type: Number,
            index: true,
        },
        specialization: {
            type: Number,
            index: true,
        },
        specialization_isother: {
            type: Boolean,
            default: false,
        },
        specialization_other: {
            type: String,
        },
        cached_institute_id: {
            type: Number,
        },
        institute_name: {
            type: String,
        },
        institute_isother: {
            type: Boolean,
            default: false,
        },
        institute_other: {
            type: String,
        },
        course: {
            type: Number,
            index: true,
        },
        course_type: {
            type: String,
        },
        starting_date: {
            type: Number,
        },
        ending_date: {
            type: Number,
        },
        course_duration: {
            type: String,
        },
        grading_system: {
            type: String,
        },
        grading_system_explanation: {
            type: String,
        },
        grade: {
            type: String,
        },
        board: {
            type: Number,
            index: true,
        },
        board_isother: {
            type: Boolean,
            default: false,
        },
        board_other: {
            type: String,
        },
        stream: {
            type: String,
            index: true,
        },
        school: {
            type: String,
        },
        country: {
            type: Number,
        },
        state: {
            type: Number,
        },
        city: {
            type: Number,
            index: true,
        },
        passing_year: {
            type: Number,
        },
        aggregate: {
            type: String,
        },
        status: {
            type: Number,
            default: 1,
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
SeekerEducationSchema.index({ id: 1, status: 1 })
SeekerEducationSchema.index({ seeker_id: 1, status: 1 })
export default model("SeekerEducation", SeekerEducationSchema, "seeker_educations")