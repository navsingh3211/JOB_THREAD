import { sequelize, DataTypes } from '../../config/sequelize.js'

const EmployerLoginHistory = sequelize.define('employer_login_history', {
    employer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    auth_type: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    },
    is_active: {
        type: DataTypes.INTEGER,
        defaultValue: true
    },
    jwt_token: {
        type: DataTypes.TEXT
    },    
    last_access: {
        type: DataTypes.DATE
    },
    logout_at: {
        type: DataTypes.DATE
    },
},
    {
        tableName: 'employer_login_history',
        timestamps: false,
        indexes: [
            {
                unique: false,
                fields: ['employer_id']
            }
        ]
    }
)
export default EmployerLoginHistory