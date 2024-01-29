import { Schema } from '../../config/mongoose.js'
import mongoose from 'mongoose'

const _schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            index: { unique: true }
        },
        job_category: {
            type: Number,
            default: null,
            index: true
        },
        category: {
            type: Number,
            default: null,
            index: true
        },
        subcategory: {
            type: Number,
            default: null,
            index: true
        },
        subcategory2: {
            type: Number,
            default: null,
            index: true
        },
        role: {
            type: Number,
            default: null,
            index: true
        },
        subject: {
            type: Number,
            default: null,
            index: true
        },
        JTL_LAY_EXP_NPD_SAL_SKL_count: {
            type: Number,
            default: null,
        },
        public_job_count: {
            type: Number,
            default: null,
        },
        is_featured: {
            type: Boolean,
            default: false,
            select: false,
        }
    },
    {
        timestamps: true
    }
)
_schema.index({ job_category: 1, category: 1 })
_schema.index({ job_category: 1, role: 1 })
export default mongoose.model('CacheProbableTitle', _schema, 'cache_probable_titles')