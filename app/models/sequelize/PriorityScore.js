import { sequelize, DataTypes } from '../../config/sequelize.js'

const PriorityScore = sequelize.define('search_priority_score_constants', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    searchpriority: {
        type: DataTypes.INTEGER
    },   
    highest: {
        type: DataTypes.BIGINT
    },
    lowest: {
        type: DataTypes.BIGINT
    }
},
    {
        tableName: 'search_priority_score_constants',
        timestamps: false,
    }
)
export default PriorityScore