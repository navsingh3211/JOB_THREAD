import { sequelize, DataTypes } from '../../config/sequelize.js'

const InstituteCategorizationsMap = sequelize.define('institute_categorizations_map',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        parent_id: {
            type: DataTypes.INTEGER
        },
        child_id: {
            type: DataTypes.INTEGER
        },
        level: {
            type: DataTypes.INTEGER
        },
        root_cat: {
            type: DataTypes.INTEGER
        },
        root_cat_1: {
            type: DataTypes.INTEGER
        },
        root_cat_2: {
            type: DataTypes.INTEGER
        },
        root_cat_3: {
            type: DataTypes.INTEGER
        },
        created_on: {
            type: DataTypes.DATE
        },
    },
    {
        tableName: 'institute_categorizations_map',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['parent_id'] },
            { unique: false, fields: ['child_id'] },
            { unique: false, fields: ['level'] },
            { unique: false, fields: ['root_cat'] },
        ]
    }
)
export default InstituteCategorizationsMap