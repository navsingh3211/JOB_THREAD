import { sequelize, DataTypes } from '../../config/sequelize.js'

const PreferenceLocationCity = sequelize.define('seeker_jobpreference_locations_cities', {
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
    location_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'seeker_jobpreference_locations',
            key: 'id',
        }
    },
    state_id: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'seeker_jobpreference_locations_cities',
        timestamps: false,
    }
)
export default PreferenceLocationCity
