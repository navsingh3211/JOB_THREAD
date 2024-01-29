import { sequelize, DataTypes } from '../../config/sequelize.js'

const InstituteCategorization = sequelize.define('institute_categorizations',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING
        },
        is_root: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        created_on: {
            type: DataTypes.DATE,
        },
        last_updated_on: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        deleted_on: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        reminiscent_id: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        ref: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        refid: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        is_processed: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        is_featured: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        tableName: 'institute_categorizations',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['is_root'] },
            { unique: false, fields: ['status'] }
        ]
    }
)

export default InstituteCategorization