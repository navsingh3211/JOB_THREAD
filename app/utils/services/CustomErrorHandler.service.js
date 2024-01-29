class CustomErrorHandler extends Error {

    constructor(status, msg){
        super()
        this.status = status
        this.message = msg
    }
    
    static badRequest(msg = 'Please provide data') {
        return new CustomErrorHandler(400, msg)
    }

    static wrongCrendential(msg = 'Invalid email or password') {
        return new CustomErrorHandler(401, msg)
    }

    static unAuthorized(msg = 'Unauthorized') {
        return new CustomErrorHandler(401, msg)
    }
    
    static notFound(msg = 'Not Found') {
        return new CustomErrorHandler(404, msg)
    }

    static alreadyExist(msg) {
        return new CustomErrorHandler(409, msg)
    }

    static validationError(msg = 'Please enter required field') {
        return new CustomErrorHandler(422, msg)
    }
}

export default CustomErrorHandler