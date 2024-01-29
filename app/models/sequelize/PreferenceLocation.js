import { sequelize, DataTypes } from '../../config/sequelize.js'
import PreferenceLocationCity from './PreferenceLocationCity.js'

const PreferenceLocation = sequelize.define('seeker_jobpreference_locations', {
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
    jobpreference_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'seeker_jobpreference',
            key: 'id',
        }
    },
    country: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'seeker_jobpreference_locations',
        timestamps: false,
    }
)

PreferenceLocation.hasMany(PreferenceLocationCity, { as: 'cities', foreignKey: 'location_id' })

export default PreferenceLocation
