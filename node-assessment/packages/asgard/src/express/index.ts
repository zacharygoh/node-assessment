import express from "express"
import http from "http"
import config from "./config"
import logger from "../logger"

export default class HttpServer {
    private _expressApplication: express.Application
    private _server: http.Server

    constructor() {
        this._expressApplication = express()
        this._expressApplication = config.expressConfig(this._expressApplication)
        this._expressApplication = config.morganConfig(this._expressApplication)
        this._server = this._expressApplication.listen(this._expressApplication.get('port'))
        config.enrollControllers(this._expressApplication)
        logger.initLog()
        config.consoleText(this._expressApplication)
    }
    
    public get app(): express.Application {
        return this._expressApplication
    }

    public get server(): http.Server {
        return this._server
    }
}