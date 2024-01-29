import { Schema } from "../../config/mongoose.js";
import mongoose from "mongoose";

const _schema = new Schema(
    {
        pk: {
            type: Number,
            required: true,
            index: { unique: true },
        },
        preferenceid: {
            type: Number,
            index: true,
        },
        jobpostid: {
            type: Number,
            index: true,
        },
        priority_searched_for: {
            type: String,
            index: true,
        },
        preference_title: {
            type: String,
            index: true,
        },
        job_title: {
            type: String,
            index: true,
        },
        seeker_id: {
            type: Number,
            index: true,
        },
        JTL_SCORE: {
            type: Number,
        },
        LAY_SCORE: {
            type: Number,
        },
        EXP_SCORE: {
            type: Number,
            default: 0,
        },
        NPD_SCORE: {
            type: Number,
            default: 0,
        },
        SAL_SCORE: {
            type: Number,
            default: 0,
        },
        SKL_SCORE: {
            type: Number,
            default: 0,
        },
        TOTALSCORE: {
            type: Number,
        },
        MATCH_DELTA: {
            type: Number,
        },
        MATCH_PERCENTAGE: {
            type: Number,
        },
        is_perfectmatch: {
            type: Boolean,
        },
        job_category: {
            type: Number
        },
        created_on: {
            type: Date,
        },
        preference_location: {
            type: String,
        },
        preference_experience: {
            type: Number,
            default: 0,
        },
        preference_notice_period: {
            type: Number,
            default: 0,
        },
        preference_skills: {
            type: String,
        },
        preference_employment_type: {
            type: Number,
        },
        preference_education: {
            type: Number,
        },
        preference_salary: {
            type: Number,
        },
        job_is_private: {
            type: Boolean
        },
    },
    {
        timestamps: true,
    }
)
export default mongoose.model("CacheSearchCandidateResult", _schema, "cache_search_candidate_results");
