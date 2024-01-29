import { sequelize, DataTypes } from '../../config/sequelize.js'

const SeekerQualification = sequelize.define('seeker_professionalqualification', {
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
    qualifications_id: DataTypes.INTEGER,
    qualification: DataTypes.STRING,
    qualifications_isother: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    qualifications_other: DataTypes.STRING,
    level_cleared: DataTypes.STRING,
    authority: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    status: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    created_on: DataTypes.DATE,
    last_updated_on: DataTypes.DATE,
    deleted_on: DataTypes.DATE,
},
    {
        tableName: 'seeker_professionalqualification',
        timestamps: false,
    }
)

export default SeekerQualification
