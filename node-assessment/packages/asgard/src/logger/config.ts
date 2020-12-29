import { format } from "winston"
import moment from "moment"

namespace LogConfig {
    export const httpInfoFile = {
        level: 'info',
        filename: `${process.cwd()}/logs/${moment().format('YYYY-MM-DD')}/http/info.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
        colorize: true
    }

    export const httpErrorFile = {
        level: 'error',
        filename: `${process.cwd()}/logs/${moment().format('YYYY-MM-DD')}/http/error.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
        colorize: true
    }

    export const infoFile = {
        level: 'info',
        filename: `${process.cwd()}/logs/${moment().format('YYYY-MM-DD')}/info.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
        colorize: true
    }

    export const errorFile = {
        level: 'error',
        filename: `${process.cwd()}/logs/${moment().format('YYYY-MM-DD')}/error.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
        colorize: true
    }

    export const exceptionFile = {
        filename: `${process.cwd()}/logs/${moment().format('YYYY-MM-DD')}/exception.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
        colorize: true
    }
    
    export const console = {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }

    export const logFormat =  format.printf(({ level, message, timestamp }) => {
        return `DateTime: ${timestamp}\n` + 
        `Level: ${level}\n` + 
        `${message}\n`
    })
}

export default LogConfig