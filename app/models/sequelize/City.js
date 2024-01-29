import { sequelize, DataTypes } from '../../config/sequelize.js'

const City = sequelize.define('xx_cities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
    state_id: {
        type: DataTypes.INTEGER
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
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
        tableName: 'xx_cities',
        timestamps: false,
    }
)
export default City