import { sequelize, DataTypes } from '../../config/sequelize.js'

const Language = sequelize.define('languages', {
    lang_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lang_name: {
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
        tableName: 'languages',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['status'] },
        ]
    }
)
export default Language