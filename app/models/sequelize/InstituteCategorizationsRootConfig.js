import { sequelize, DataTypes } from '../../config/sequelize.js'

const InstituteCategorizationsRootConfig = sequelize.define('institute_categorizations_root_configs',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        no_of_levels: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        level_names: {
            type: DataTypes.STRING
        },
        level_to_define_domain: {
            type: DataTypes.INTEGER
        },
        has_courses_offered: {
            type: DataTypes.BOOLEAN(4),
            defaultValue: 0
        },
        has_adjective: {
            type: DataTypes.BOOLEAN(4),
            defaultValue: 0
        },
        levels_to_show_in_jobcard: {
            type: DataTypes.STRING(50)
        },
        title_conjunction: {
            type: DataTypes.STRING(10)
        },
        title_format_academic: {
            type: DataTypes.STRING
        },
        title_format_nonacademic: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        created_on: {
            type: DataTypes.DATE,
        },
        last_updated_on: {
            type: DataTypes.DATE
        },
        deleted_on: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'institute_categorizations_root_configs',
        timestamps: false,
        indexes: [
            {
                unique: false,
                fields: ['category_id']
            },
            {
                unique: false,
                fields: ['level_to_define_domain']
            },
            {
                unique: false,
                fields: ['status']
            }
        ]
    }
)

// await InstituteCategorizationsRootConfig.sync();
// console.log("The table for the InstituteCategorizationsRootConfig model was just (re)created!");

export default InstituteCategorizationsRootConfig