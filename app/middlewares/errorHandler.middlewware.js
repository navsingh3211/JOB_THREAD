import CustomErrorHandler from '../utils/services/CustomErrorHandler.service.js'
import { DEBUG_MODE } from './../config/index.js'

const errorHandler = (err) => {
    
    let statusCode = err.status || 500
    let error = {
        code: 'SERVER_ERROR',
        message: DEBUG_MODE === 'true' ? err.message : 'Internal server error',
        ...(DEBUG_MODE === 'true' && { originalError: err.message })
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = err.status
        error = {
            code: 'ERROR_OCCUR',
            message: err.message
        }
    }

    return { status: statusCode, error }
}

export default errorHandler