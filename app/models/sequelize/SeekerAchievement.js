import { sequelize, DataTypes } from '../../config/sequelize.js'

const SeekerAchievement = sequelize.define('seeker_achievement', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    seeker_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'jobseeker', // refers to table name
            key: 'id', // 'id' refers to column name in jobseeker table
        }
    },
    achievement: DataTypes.STRING,
    year: DataTypes.STRING,    
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'seeker_achievement',
        timestamps: false,
    }
)

export default SeekerAchievement
