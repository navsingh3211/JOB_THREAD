import express from 'express'
import makeExpressCallback from '../../express-callback.js'
import findCandidate from '../../../controllers/employers/findCandidate.js'

const route = express.Router()

route.get('/candidates/domains', makeExpressCallback(findCandidate.instituteList))
route.get('/candidates/suggestion-titles', makeExpressCallback(findCandidate.suggestionTitles))
route.get('/candidates/hire-for-jobs', makeExpressCallback(findCandidate.hiringForJobs))
route.get('/candidates/job-types', makeExpressCallback(findCandidate.jobTypeList))
route.get('/candidates', makeExpressCallback(findCandidate.candidateList))
route.get('/candidates-revamp', makeExpressCallback(findCandidate.candidateListRevamp))
route.get('/candidates/:prefId', makeExpressCallback(findCandidate.candidateShow))

export default route