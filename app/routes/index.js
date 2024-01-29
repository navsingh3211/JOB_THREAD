import express from 'express'
import publicRoute from './public/index.js'
import protectedRoute from './protected/index.js'

const route = express.Router()

// Maintain ordering to applied public & protected route
// +++ Make sure keep protected route at the end

route.use(publicRoute)
route.use(protectedRoute)

export default route