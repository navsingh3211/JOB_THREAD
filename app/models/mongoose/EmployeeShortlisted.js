import { Schema, model } from "../../config/mongoose.js";

const EmployeeShortlisted = new Schema(
	{
		id: {
			type: Number,
			required: true,
			index: { unique: true },
		},
		employer_id: {
			type: Number,
			index: true,
		},
		institution_id: {
			type: Number,
			index: true,
		},
		seeker_id: {
			type: Number,
			index: true,
		},
		seeker_prefId: {
			type: Number,
			index: true,
		},
		preference_snapshot: {
			type: String,
		},
		job_id: {
			type: Number,
			index: true,
		},
		final_status: {
			type: Number,
			default: 0,
			index: true,
		},
		is_selected: {
			type: Number,
			default: 0,
			index: true,
		},
		is_rejected: {
			type: Number,
			default: 0,
			index: true,
		},
		is_hold: {
			type: Number,
			default: 0,
			index: true,
		},
		pinned: {
			type: Number,
			default: 0,
			index: true,
		},
		comments: {
			type: String,
		},
		recommended: {
			type: String,
		},
		action_date: {
			type: Date,
		},
		status: {
			type: Number,
			default: 1,
			index: true,
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
		is_mail_triggred_for_online_event_cancelled: {
			type: Number,
			default: 0
		},
	},
	{
		timestamps: true,
	}
);
EmployeeShortlisted.index({ seeker_id: 1, seeker_prefId: 1, job_id: 1, status: 1 })
EmployeeShortlisted.index({ employer_id: 1, seeker_prefId: 1, job_id: 1, status: 1 })
export default model("EmployeeShortlisted", EmployeeShortlisted, "employee_shortlisted")
