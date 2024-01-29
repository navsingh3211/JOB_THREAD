import { sequelize, DataTypes } from '../../config/sequelize.js'

const InstituteCategorizationConfig = sequelize.define('institute_categorizations_configs',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        area_of_operation: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        level_no: {
            type: DataTypes.BOOLEAN
        },
        level_position: {
            type: DataTypes.BOOLEAN
        },
        label: { type: DataTypes.STRING },
        data_unique_to_parent: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        data_dependancy_level: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        data_map_type: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        data_maping_table: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        allow_custom: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        seq_in_search: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        is_select_mandatory: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        is_input_dynamic: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        is_multi_entry: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        is_sch_matchmaker: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        is_sch_tiebreaker: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
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
        }
    },
    {
        tableName: 'institute_categorizations_configs',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['category_id'] },
            { unique: false, fields: ['area_of_operation'] },
            { unique: false, fields: ['level_no'] },
            { unique: false, fields: ['level_position'] },
            { unique: false, fields: ['is_select_mandatory'] },
            { unique: false, fields: ['is_sch_tiebreaker'] },
        ]
    }
)

export default InstituteCategorizationConfig