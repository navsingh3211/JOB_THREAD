import { sequelize, DataTypes } from "../../config/sequelize.js";

const CacheSearchCandidateResult = sequelize.define(
  "cache_search_candidate_result",
  {
    pk: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    preferenceid: {
      type: DataTypes.INTEGER,
    },
    jobpostid: {
      type: DataTypes.INTEGER,
    },
    priority_searched_for: {
      type: DataTypes.STRING,
    },
    preference_title: {
      type: DataTypes.STRING,
    },
    job_title: {
      type: DataTypes.STRING,
    },
    seeker_id: {
      type: DataTypes.INTEGER,
    },
    JTL_SCORE: {
      type: DataTypes.DOUBLE,
    },
    LAY_SCORE: {
      type: DataTypes.DOUBLE,
    },
    EXP_SCORE: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    NPD_SCORE: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    SAL_SCORE: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    SKL_SCORE: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    TOTALSCORE: {
      type: DataTypes.DOUBLE,
    },
    MATCH_DELTA: {
      type: DataTypes.DOUBLE,
    },
    MATCH_PERCENTAGE: {
      type: DataTypes.INTEGER,
    },
    is_perfectmatch: {
      type: DataTypes.BOOLEAN,
    },
    job_category: {
      type: DataTypes.INTEGER,
    },
    created_on: {
      type: DataTypes.DATE,
    },
    preference_location: {
      type: DataTypes.STRING,
    },
    preference_experience: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    preference_notice_period: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    preference_skills: {
      type: DataTypes.TEXT("long"),
    },
    preference_employment_type: {
      type: DataTypes.STRING,
    },
    preference_education: {
      type: DataTypes.STRING,
    },
    preference_salary: {
      type: DataTypes.INTEGER,
    },
    job_is_private: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "cache_search_candidate_result",
    timestamps: false,
    indexes: [
      {
        unique: false,
        fields: ["preferenceid", "jobpostid", "priority_searched_for"],
      },
      {
        unique: false,
        fields: ["priority_searched_for", "preference_title", "job_title"],
      },
      { unique: false, fields: ["jobpostid", "priority_searched_for"] },
      { unique: false, fields: ["preferenceid", "priority_searched_for"] },
      { unique: false, fields: ["priority_searched_for", "preference_title"] },
      { unique: false, fields: ["priority_searched_for", "job_title"] },
    ],
  }
);
export default CacheSearchCandidateResult;
