import errorHandler from '../middlewares/errorHandler.middlewware.js'
import logger from '../utils/logger.js'

export default (controller) => (req, res) => {

    const headers = req.headers.authorization

    const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        user: req.user,
        logger: req.logger,
        token: headers ? headers.split(' ')[1] : null,
        headers: {
            'Content-Type': req.get('Content-Type'),
            Referer: req.get('referer'),
            'User-Agent': req.get('User-Agent')
        }
    }

    controller(httpRequest)
        .then((httpResponse) => {
            res.set('Content-Type', 'application/json')
            res.type('json')
            const statusCode = httpResponse.statusCode ? httpResponse.statusCode : 200
            const body = {
                success: true,
                error: null,
                data: httpResponse.body ? httpResponse.body : httpResponse
            }
            res.status(statusCode).send(body)
        })
        .catch((e) => {
            //console.log('error fallback ', errorHandler(e))
            const { status, error } = errorHandler(e)
            const _status = status ?? 500
            const _error = error ?? 'An unkown error occurred.'

            const body = {
                success: false,
                error: _error,
                data: null
            };
            res.status(_status).send(body)
            logger.error(`${_status} || ${JSON.stringify(_error.message || error)} 📌 ${req.originalUrl} - ${req.method} - ${req.ip}`)
        });
}