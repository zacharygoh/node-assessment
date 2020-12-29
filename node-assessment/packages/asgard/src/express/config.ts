import express, { json, urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import chalk from "chalk"
import { useExpressServer } from "routing-controllers"
import figlet from "figlet"
import morgan from "morgan"
import logger from "../logger"
import app from "../app"
import appRootPath from "app-root-path"
import EnvGlob from "../envglob"

namespace HttpServerConfig {
    export function expressConfig(expressApp: express.Application): express.Application {
        expressApp.set('host', '0.0.0.0')
        if(process.env.PORT !== undefined) {
            expressApp.set('port', process.env.PORT)
        }else{
            expressApp.set('port', process.env[`${app.getName().toUpperCase()}_PORT`] || 8080)
        }
        expressApp.use(json());
        expressApp.use(urlencoded({ extended: true }))
        expressApp.use(cookieParser())
        expressApp.disable('x-powered-by')
        expressApp.options('*', cors())
        expressApp.use((req: express.Request, res: any, next: express.NextFunction) => {
            /** Use type any for response to inject new key into object */
            res.header("Access-Control-Allow-Origin", "*")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
            res.header("Access-Control-Allow-Credentials", 'true')
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            let originalSend = res.send
            res.send = function (body:any) { 
              res._resBody = JSON.parse(body)
              originalSend.call(this, body)
            }
            next()
        })
        return expressApp
    }

    export function morganConfig(expressApp: express.Application): express.Application {
        morgan.token('request', (req: express.Request, res: express.Response) =>  {
            let request = ""
            if(req.params && Object.keys(req.params).length !== 0){
                request = JSON.stringify(req.params, null, 2).replace(/\"/g, "")
            }else if(req.body && Object.keys(req.body).length !== 0){
                request = JSON.stringify(req.body, null, 2).replace(/\"/g, "")
            }else if(req.query && Object.keys(req.query).length !== 0) {
                request = JSON.stringify(req.query, null, 2).replace(/\"/g, "")
            }
            return request
        })
        morgan.token('response', (req: express.Request, res: any) =>  {
            let response = ""
            if(res._resBody && Object.keys(res._resBody).length !== 0){
                response = JSON.stringify(res._resBody, null, 2).replace(/\"/g, "")
            }
            return response
        })
        expressApp.use(morgan(
            'Method: :method \n' + 
            'URL: :url \n' + 
            'From: :remote-addr \n' +
            'Request: :request \n' + 
            'Response: :response \n' + 
            'Details: :status :response-time ms - :res[content-length]', 
            { 
                skip: (req: express.Request, res: express.Response) => {
                    return res.statusCode < 400
                },
                stream: {
                    write(message) {
                        logger.httpLog.error(message)
                    }
                }
            }
        ))
        expressApp.use(morgan(
            'Title: HTTP\n' +
            'Method: :method \n' + 
            'URL: :url \n' + 
            'From: :remote-addr \n' +
            'Request: :request \n' + 
            'Response: :response \n' + 
            'Details: :status :response-time ms - :res[content-length]', 
            { 
                skip: (req: express.Request, res: express.Response) => {
                    return res.statusCode >= 400
                },
                stream: {
                    write(message) {
                        logger.httpLog.info(message)
                    }
                } 
            }
        ))
        return expressApp
    }
    
    export function enrollControllers(expressApp: express.Application) {
        expressApp.get('/', (req: express.Request, res: express.Response) => {
            res.json({data: `Hello ${app.getName()}`})
        })
        useExpressServer(expressApp, {
            routePrefix: "/v1/app",
            controllers: [
                `${appRootPath}/packages/asgard/${EnvGlob.folder}/socketio/default.${EnvGlob.type}`,
                `${process.cwd()}/${EnvGlob.folder}/interfaces/**/http.controller.${EnvGlob.type}`
            ]
        })
    }

    export function consoleText(expressApp: express.Application) {
        console.log(figlet.textSync(app.getName()))
        console.log(`${chalk.green('✓')} ${app.getName()} is running at http://localhost:${expressApp.get('port')} in ${expressApp.get('env')} mode`)
        console.log(`${chalk.green('✓')} Press ${chalk.red('CTRL-C')} to stop`)
    }
}

export default HttpServerConfig
