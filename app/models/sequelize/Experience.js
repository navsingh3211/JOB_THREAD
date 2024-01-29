import { sequelize, DataTypes } from '../../config/sequelize.js'

const Experience = sequelize.define('experience_master', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    in_months: {
        type: DataTypes.INTEGER
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
        tableName: 'experience_master',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['status'] },
        ]
    }
)
export default Experience