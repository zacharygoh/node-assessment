import { createLogger, transports, format } from "winston"
import winston from "winston"
import LogConfig from "./config"

export default class Logger {
    private static _log: winston.Logger
    private static _httpLog: winston.Logger

    public static initLog() {
        Logger._log = createLogger({
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp({ format: 'DD-MM-YY | HH:mm:ss' }),
                LogConfig.logFormat
            ),
            transports: [
                new transports.File(LogConfig.infoFile),
                new transports.File(LogConfig.errorFile),
                new transports.Console(LogConfig.console),
            ],
            exceptionHandlers: [
                new transports.File(LogConfig.exceptionFile)
            ],
            exitOnError: false, // do not exit on handled exceptions
        })

        Logger._httpLog = createLogger({
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp({ format: 'DD-MM-YY | HH:mm:ss' }),
                LogConfig.logFormat
            ),
            transports: [
                new transports.File(LogConfig.httpInfoFile),
                new transports.File(LogConfig.httpErrorFile),
                new transports.Console(LogConfig.console),
            ],
            exceptionHandlers: [
                new transports.File(LogConfig.exceptionFile)
            ],
            exitOnError: false, // do not exit on handled exceptions
        })
    }

    public static info(title: string, message: string, module?: NodeModule) {
        const logMessage = module ? Logger.loggingInfo(title, message, module) : Logger.loggingInfo(title, message)
        Logger._log.info(logMessage)
    }

    public static debug(title: string, message: string, module?: NodeModule) {
        const logMessage = module ? Logger.loggingInfo(title, message, module) : Logger.loggingInfo(title, message)
        Logger._log.debug(logMessage)
    }

    public static error(title: string, message: string, module?: NodeModule) {
        const logMessage = module ? Logger.loggingInfo(title, message, module) : Logger.loggingInfo(title, message)
        Logger._log.error(logMessage)
    }

    private static loggingInfo(title: string, message: string, module?: NodeModule) {
        let info = `Title: ${title}\n`
        info += `Message: ${message}\n`
        if(module){
            info += `From: ${module.filename}`
        }
        return info
    }

    public static get log(): winston.Logger {
        return this._log
    }

    public static get httpLog(): winston.Logger {
        return this._httpLog
    }
}