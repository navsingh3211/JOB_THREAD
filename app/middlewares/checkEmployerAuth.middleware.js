import JwtService from '../utils/services/JWT.service.js'
import { employerLoginHistoryDB } from '../data_access/index.js'

const checkAuth = async (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            error: { message: 'Unauthorized' },
            data: null,
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const { employerId } = JwtService.verify(token)        
        const loginHistoryItem = await employerLoginHistoryDB.findOne({ jwt_token: token, is_active: 1 })
        if (!employerId && !loginHistoryItem) throw new Error()
        //console.log('loginHistoryItem -> ', loginHistoryItem)
        const employer = { employerId }
        req.employer = employer
        //console.log('employer ', employer)
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: { message: 'Unauthorized' },
            data: null,
        })
    }

    next()
}
export default checkAuth