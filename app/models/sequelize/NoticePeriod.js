import { sequelize, DataTypes } from '../../config/sequelize.js'

const NoticePeriod = sequelize.define('notice_peroid', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    day: {
        type: DataTypes.INTEGER
    },
    name: {
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
        tableName: 'notice_peroid',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['status'] },
        ]
    }
)
export default NoticePeriod