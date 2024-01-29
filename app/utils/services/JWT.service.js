import jwt from "jsonwebtoken";
import { JWT_KEY } from '../../config/index.js'

class JwtService {

    static sign(payload, expire = '180m', jwtKey = JWT_KEY) {
        return jwt.sign(payload, jwtKey, { expiresIn: expire })
    }

    static verify(token, jwtKey = JWT_KEY) {
        return jwt.verify(token, jwtKey)
    }
}

export default JwtService