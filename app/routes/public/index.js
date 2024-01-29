import express from 'express'
import common from './common.route.js'
import search from './search.route.js'

const route = express.Router()

route.use(common)
route.use(search)

export default route