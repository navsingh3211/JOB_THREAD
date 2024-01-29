import { createLogger, format, transports } from 'winston'
const currentDate = new Date().toJSON().slice(0, 10);

const logger = createLogger({
    transports:
        new transports.File({
            filename: `logs/${currentDate}.log`,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),
})

export default logger