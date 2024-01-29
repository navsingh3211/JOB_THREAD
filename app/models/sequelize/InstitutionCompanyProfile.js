import { sequelize, DataTypes } from '../../config/sequelize.js'
import InstitutionCompanyCoursesOffered from './InstitutionCompanyCoursesOffered.js'

const InstitutionCompanyProfile = sequelize.define('institution_company_profiles',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ref_code: {
            type: DataTypes.STRING
        },
        institution_company_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'institution_companies', // refers to table name
                key: 'id', // 'id' refers to column name in institution_companies table
            }
        },
        institution_name: DataTypes.STRING,
        institution_logo: DataTypes.STRING,
        institution_description: DataTypes.TEXT,
        institution_cat: DataTypes.INTEGER,
        institution_subcat: DataTypes.INTEGER,
        institution_subcat_other: DataTypes.STRING,
        institution_subcat2: DataTypes.INTEGER,
        institution_subcat2_other: DataTypes.STRING,
        category_adjective_id: DataTypes.INTEGER,
        ownership_type: DataTypes.STRING,
        ownership_brand: DataTypes.STRING,
        affiliation_with: DataTypes.STRING,
        affiliation_certificate: DataTypes.STRING,
        no_of_branch: DataTypes.STRING,
        employee_strength: DataTypes.STRING,
        student_strength: DataTypes.STRING,
        country: DataTypes.INTEGER,
        state: DataTypes.INTEGER,
        city: DataTypes.INTEGER,
        address: DataTypes.TEXT,
        address_longitude: DataTypes.STRING,
        address_latitude: DataTypes.STRING,
        default_venue_addres: DataTypes.TEXT,
        default_venue_addres_longitude: DataTypes.STRING,
        default_venue_addres_latitude: DataTypes.STRING,
        address_places_id: DataTypes.STRING,
        pincode: DataTypes.STRING,
        url: DataTypes.STRING,
        company_pan: DataTypes.STRING,
        company_gst: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        created_on: DataTypes.DATE,
        last_updated_on: DataTypes.DATE,
        deleted_on: DataTypes.DATE,
        under_vetting: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        institute_name_vetting: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    },
    {
        tableName: 'institution_company_profiles',
        timestamps: false,
        indexes: [
            { unique: false, fields: ['institution_company_id'] },
            { unique: false, fields: ['institution_name'] },
            { unique: false, fields: ['institution_cat'] },
            { unique: false, fields: ['institution_subcat'] },
            { unique: false, fields: ['institution_subcat2'] },
            { unique: false, fields: ['category_adjective_id'] },
            { unique: false, fields: ['country'] },
            { unique: false, fields: ['state'] },
            { unique: false, fields: ['city'] },
            { unique: false, fields: ['status'] },
            { unique: false, fields: ['under_vetting'] },
            { unique: false, fields: ['institute_name_vetting'] },
        ]
    }
)

InstitutionCompanyProfile.hasMany(InstitutionCompanyCoursesOffered, { as: 'courses', foreignKey: 'institute_id' })
export default InstitutionCompanyProfile