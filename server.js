import { createServer } from 'http';
import cluster from 'cluster';
import { availableParallelism } from 'os';
import { DEBUG_MODE, APP_PORT } from './app/config/index.js';
import { connectMySqlDB } from './app/config/sequelize.js';
import { connectMonogoDB } from './app/config/mongoose.js';
import app from './app/app.js';
import createSocket from './app/socketio.js';
import logger from './app/utils/logger.js';

const numCPUs = availableParallelism()
const server = createServer(app)

if (cluster.isPrimary) {

    DEBUG_MODE && console.log(`Primary ${process.pid} is running`)

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    DEBUG_MODE && console.log('numCPUs ---->>> ', numCPUs)

    cluster.on('exit', (worker, code, signal) => {
        DEBUG_MODE && console.log(`worker ${worker.process.pid} died`)
        DEBUG_MODE && console.log("Let's fork another worker!")
        cluster.fork()
    })

} else {

    DEBUG_MODE && console.log(`Worker ${process.pid} started`)

    // Connect Databases
    connectMonogoDB()
    connectMySqlDB()

    // Start the server
    server.listen(APP_PORT, () => {
        DEBUG_MODE && console.log(`App is listening on port ${APP_PORT}`)
        logger.info(`App is listening on port ${APP_PORT}`)
    });

    createSocket(server)
}