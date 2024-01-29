import { Schema, model } from "../../config/mongoose.js";

const SeekerAppliedJob = new Schema(
	{
		id: {
			type: Number,
			required: true,
			index: { unique: true },
		},
		folder_id: {
			type: Number,
			index: true,
		},
		job_id: {
			type: Number,
			index: true,
		},
		seeker_id: {
			type: Number,
			index: true,
		},
		preference_id: {
			type: Number,
			index: true,
		},
		preference_snapshot: {
			type: String,
		},
		applied_date: {
			type: Date,
		},
		applied_through: {
			type: Number,
			default: 1,
			index: true,
		},
		experience: {
			type: Number,
		},
		min_salary: {
			type: Number,
		},
		city: {
			type: Number,
		},
		is_viewed: {
			type: Number,
			default: 1,
			index: true,
		},
		viewed_on: {
			type: Date,
		},
		is_shortlisted: {
			type: Number,
			default: 0,
			index: true,
		},
		is_rejected: {
			type: Number,
			default: 0,
			index: true,
		},
		is_interviewed: {
			type: Number,
			default: 0,
			index: true,
		},
		profileRelevance_score: { type: Schema.Types.Decimal128 },
		lastActivity_score: { type: Schema.Types.Decimal128 },
		experience_score: { type: Schema.Types.Decimal128 },
		noticePeriod_score: { type: Schema.Types.Decimal128 },
		salary_score: { type: Schema.Types.Decimal128 },
		skills_score: { type: Schema.Types.Decimal128 },
		profileRelevance_score_isRejected: {
			type: Number,
			index: true,
		},
		lastActivity_score_isRejected: {
			type: Number,
			index: true,
		},
		experience_score_isRejected: {
			type: Number,
			index: true,
		},
		noticePeriod_score_isRejected: {
			type: Number,
			index: true,
		},
		salary_score_isRejected: {
			type: Number,
			index: true,
		},
		skills_score_isRejected: {
			type: Number,
			index: true,
		},
		isRejected: {
			type: Number,
			default: 0,
			index: true,
		},
		is_perfectmatch: {
			type: Number,
			default: 0,
			index: true,
		},
		is_processed: {
			type: Number,
			default: 0,
			index: true,
		},
		isScoreProcessed: {
			type: Number,
			default: 0,
			index: true,
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
		salesforce_data_push_flag: {
			type: Number,
			default: 0,
			index: true,
		},
	},
	{
		timestamps: true,
	}
)
SeekerAppliedJob.index({ seeker_id: 1, preference_id: 1, job_id: 1, status: 1 })
export default model("SeekerAppliedJob", SeekerAppliedJob, "seeker_applied_job");