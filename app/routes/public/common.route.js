import express from 'express'
import makeExpressCallback from '../express-callback.js'
import titleController from '../../controllers/title.js'
import syncDataController from '../../controllers/syncData.js'

const route = express.Router()

route.get('/titles', makeExpressCallback(titleController.titleList))
route.post('/sync-mysql-to-mongo', makeExpressCallback(syncDataController.mysqlToMongo))

export default route