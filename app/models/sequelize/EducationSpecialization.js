import { sequelize, DataTypes } from '../../config/sequelize.js'

const EducationSpecialization = sequelize.define('education_specialisation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    education_id: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING
    },
    slug: {
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
        tableName: 'education_specialisation',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['education_id'] },
            { unique: false, fields: ['status'] },
        ]
    }
)

export default EducationSpecialization
