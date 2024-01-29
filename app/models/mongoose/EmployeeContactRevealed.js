import { Schema, model } from "../../config/mongoose.js";

const EmployeeContactRevealed = new Schema(
    {
        id: {
            type: Number,
            required: true,
            index: { unique: true },
        },
        seeker_id: {
            type: Number,
            index: true,
        },
        employer_id: {
            type: Number,
            index: true,
        },
        job_id: {
            type: Number,
            index: true,
        },
        institution_id: {
            type: Number,
            index: true,
        },
        status: {
            type: Number,
            default: 1,
            index: true,
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
    },
    {
        timestamps: true,
    }
)
EmployeeContactRevealed.index({ seeker_id: 1, job_id: 1, status: 1 })
EmployeeContactRevealed.index({ employer_id: 1, job_id: 1, status: 1 })
export default model("EmployeeContactRevealed", EmployeeContactRevealed, "employee_contact_revealeds");
