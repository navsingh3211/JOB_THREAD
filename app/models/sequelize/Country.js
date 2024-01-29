import { sequelize, DataTypes } from '../../config/sequelize.js'

const Country = sequelize.define('xx_countries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sortname: DataTypes.STRING,
    name: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
    phonecode: {
        type: DataTypes.INTEGER
    },
    regex: DataTypes.STRING,
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
        tableName: 'xx_countries',
        timestamps: false,
    }
)
export default Country