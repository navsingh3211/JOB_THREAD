import { sequelize, DataTypes } from '../../config/sequelize.js'

const SeekerLoginHistory = sequelize.define('seeker_login_history', {
    seeker_id: {
        type: DataTypes.INTEGER
    },
    jwt_token: {
        type: DataTypes.TEXT
    },
    auth_type: {
        type: DataTypes.STRING
    },
    device_type: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.INTEGER,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE
    },
    logout_at: {
        type: DataTypes.DATE
    },
    last_access: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    deleted_on: {
        type: DataTypes.DATE
    },
},
    {
        tableName: 'seeker_login_history',
        timestamps: false,
        indexes: [
            {
                unique: false,
                fields: ['seeker_id']
            }
        ]
    }
)
export default SeekerLoginHistory