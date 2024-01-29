import dotenv from 'dotenv'
dotenv.config()

export const {
    APP_URL,
    APP_PORT,
    DEBUG_MODE,
    MONGODB_URL,
    MONGODB_PASSWORD,
    MYSQL_HOSTNAME,
    MYSQL_DATABASE,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    REDIS_HOSTNAME,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD,
    JWT_KEY,
    JWT_REFRESH_KEY,
    SOCKET_WHITELIST_URL,
} = process.env

export const EMPLOYER_S3VIEW_CDN = "https://d1t7ou3mugtvf4.cloudfront.net/"
export const EMPLOYEE_S3VIEW_CDN = "https://d245heba5s672v.cloudfront.net/"
export const COLLECTION_VALUES = {
    ADMIN: 36, // Admin
    ACAD: 35, // Academic
}
export const PRIORITIES = {
    35: [
        { _id: "JTL", label: "Job Title" },
        { _id: "LAY", label: "Last Activity" },
        { _id: "EXP", label: "Experience" },
        { _id: "NPD", label: "Notice Period" },
        { _id: "SAL", label: "Salary" },
        { _id: "SKL", label: "Skills" }
    ],
    36: [
        { _id: "JTL", label: "Job Title" },
        { _id: "SKL", label: "Skills" },
        { _id: "LAY", label: "Last Activity" },
        { _id: "EXP", label: "Experience" },
        { _id: "NPD", label: "Notice Period" },
        { _id: "SAL", label: "Salary" },
    ]
}