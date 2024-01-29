import express from 'express'
import checkAuth from '../../middlewares/checkAuth.middleware.js'
import common from './common.route.js'
import employer from './employers/index.js'

const route = express.Router()

route.use(checkAuth) // validate authentication middleware

route.use(common)
route.use(employer)

export default route