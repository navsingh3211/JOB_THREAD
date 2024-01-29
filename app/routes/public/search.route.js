import express from 'express'
import makeExpressCallback from '../express-callback.js'
import searchController from '../../controllers/search.js'

const route = express.Router()

route.get('/search/job-titles', makeExpressCallback(searchController.jobTitleList))
route.get('/search/job-types', makeExpressCallback(searchController.jobTypeList))
route.get('/search/parent-types', makeExpressCallback(searchController.parentTypeList))
route.get('/search/institution-hierarchies', makeExpressCallback(searchController.institutionHierarchyList))

export default route