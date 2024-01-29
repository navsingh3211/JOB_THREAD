import { Queue, Worker, QueueEvents } from "bullmq"
import {
    REDIS_HOSTNAME, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD
} from './index.js'

const connection = {
    host: REDIS_HOSTNAME,
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
}

export { Queue, Worker, QueueEvents, connection }