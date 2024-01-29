import { sequelize, DataTypes } from '../../config/sequelize.js'

const CacheProbableTitle = sequelize.define('cache_probable_titles', {
    title: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    job_category: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.INTEGER
    },
    subcategory: {
        type: DataTypes.INTEGER
    },
    subcategory2: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.INTEGER
    },
    subject: {
        type: DataTypes.INTEGER
    },
    JTL_LAY_EXP_NPD_SAL_SKL_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    public_job_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        tableName: 'cache_probable_titles',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['job_category'] },
            { unique: false, fields: ['category'] },
            { unique: false, fields: ['subcategory'] },
            { unique: false, fields: ['subcategory2'] },
            { unique: false, fields: ['role'] },
            { unique: false, fields: ['subject'] },
            { unique: false, fields: ['is_featured'] },
        ]
    }
)
export default CacheProbableTitle