import { sequelize, DataTypes } from '../../config/sequelize.js'

const InstituteCategorizationsAdjective = sequelize.define('institute_categorizations_adjectives',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        adjective: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        created_on: {
            type: DataTypes.DATE
        },
        last_updated_on: {
            type: DataTypes.DATE
        },
        deleted_on: {
            type: DataTypes.DATE
        },
    },
    {
        tableName: 'institute_categorizations_adjectives',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['category_id'] },
            { unique: false, fields: ['status'] },
        ]
    }
)
export default InstituteCategorizationsAdjective