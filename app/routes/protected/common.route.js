import express from 'express'
import makeExpressCallback from '../express-callback.js'
//import userController from '../../controllers/user.controller'
import titleController from '../../controllers/title.js'

const route = express.Router()

route.get('/sync-titles', makeExpressCallback(titleController.syncTitle))
//route.get('/sync-titles', (req, res) => res.status(200).json('sync-titles'))

export default route