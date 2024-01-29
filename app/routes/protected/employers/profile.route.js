import express from 'express'
import makeExpressCallback from '../../express-callback.js'
import profile from '../../../controllers/employers/profile.js'

const route = express.Router()

route.get('/profile/institutes', makeExpressCallback(profile.instituteList))

export default route