import { Sequelize, DataTypes, QueryTypes } from 'sequelize'
import {
    DEBUG_MODE,
    MYSQL_HOSTNAME, MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD
} from './index.js'
import logger from '../utils/logger.js';

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
    host: MYSQL_HOSTNAME,
    dialect: 'mysql',
    logging: false,
    sync: false, //create the tables if it not exists
});

async function connectMySqlDB() {
    try {
        await sequelize.authenticate();
        DEBUG_MODE && console.log("✅ Sequelize Connection has been established successfully.");
        logger.info(`✅ Sequelize Connection has been established successfully.`)        

        // sequelize.sync().then(() => {
        //     console.log('Book table created successfully!');
        // }).catch((error) => {
        //     console.error('Unable to create table : ', error);
        // });

    } catch (error) {
        DEBUG_MODE && console.error("Unable to connect to the sequelize database:", error);
        logger.error(`Unable to connect to the sequelize database: ${error}`)
    }
}

export { connectMySqlDB, sequelize, Sequelize, DataTypes, QueryTypes };