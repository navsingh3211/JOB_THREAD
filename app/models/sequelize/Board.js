import { sequelize, DataTypes } from '../../config/sequelize.js'

const Board = sequelize.define('board', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    slug: {
        type: DataTypes.STRING
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
        tableName: 'board',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['status'] },
        ]
    }
)
export default Board