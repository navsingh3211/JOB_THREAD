import express from 'express'
import findCandidate from './find-candidate.route.js'
import profile from './profile.route.js'

const route = express.Router()

route.use(`/webb/employer`, findCandidate)
route.use(`/webb/employer`, profile)

export default route