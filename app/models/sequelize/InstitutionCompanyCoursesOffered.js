import { sequelize, DataTypes } from '../../config/sequelize.js'

const InstitutionCompanyCoursesOffered = sequelize.define('institute_courses_offered', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'institution_companies',
            key: 'id',
        }
    },
    institute_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'institution_company_profiles',
            key: 'id',
        }
    },
    course_id: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: 'institution_company_profiles',
        //     key: 'id',
        // }
    },
    course_name: DataTypes.STRING,
    course_isother: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    course_other: DataTypes.STRING,
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
        tableName: 'institute_courses_offered',
        timestamps: false,
    }
)

export default InstitutionCompanyCoursesOffered