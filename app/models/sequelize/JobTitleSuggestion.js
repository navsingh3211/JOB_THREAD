import { sequelize, DataTypes } from '../../config/sequelize.js'

const JobTitleSuggestion = sequelize.define('job_title_suggestion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    search_keyword: {
        type: DataTypes.STRING
    },
    suggested_title: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    created_on: {
        type: DataTypes.DATE
    },    
},
    {
        tableName: 'job_title_suggestion',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['search_keyword'] },
            { unique: false, fields: ['status'] },
        ]
    }
)
export default JobTitleSuggestion