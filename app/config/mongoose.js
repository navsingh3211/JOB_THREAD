import mongoose from 'mongoose'
import {
    DEBUG_MODE,
    MONGODB_URL, MONGODB_PASSWORD
} from './index.js'
import logger from '../utils/logger.js'
const Schema = mongoose.Schema
const model = mongoose.model

async function connectMonogoDB() {

    try {
        const database = MONGODB_URL.replace('<PASSWORD>', MONGODB_PASSWORD);
        mongoose.set('strictQuery', false);
        mongoose.connect(database)
        DEBUG_MODE && console.log("✅ Mongo connection has been established successfully.");
        logger.info(`✅ Mongo connection has been established successfully.`)
    } catch (error) {
        DEBUG_MODE && console.error("Unable to connect to the mongo database:", error);
        logger.error(`Unable to connect to the mongo database: ${error}`)
    }
}

export { connectMonogoDB, Schema, model }