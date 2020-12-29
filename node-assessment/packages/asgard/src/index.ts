import app from "./app"
import http from "./express"
import Logger from "./logger"
import Ws from "./socketio"
import figlet from "figlet"
import { config } from "dotenv"
import EnvGlob from "./envglob"
import DB from "./db"
import knexGenerator from "./db/generator"
import WsState from "./socketio/state"
import "reflect-metadata"

/** @description WebSocket Socket IO's server instance
    @property { socketio.Server } io
    @property { Array<socketio.Socket> } sockets 
*/
export const ws = Ws

/** @description WebSocket State function to manipulate sockers
    @property 
*/
export const wsState = WsState

/** @description Main Logger instance to perform log */
export const logger = Logger


/** @description Shortcut function to bootstrap new application with express as HTTP server and optional socketio involvement
    @param {boolean} websocket Indicate whether require websocket
    @param {string} db Empty string to skip DB usage, available options are: mssql, postgresql
*/
export const bootstrapApp = (websocket: boolean, db?: string) => {
    config()
    EnvGlob.setEnvGlob()
    const HTTP = new http()
    if(db && db !== '') {
        if(db === 'postgresql'){
            knexGenerator.generateKnexFile('postgresql')
        }else if(db === 'mssql'){
            knexGenerator.generateKnexFile('mssql')
        }
        new DB()
    }
    if(websocket){
        ws.createServer(HTTP.server)
    }
}

if(app.getName() === 'Asgard'){
    figlet(app.getName().toUpperCase(), (err, data)=> {
        console.log(data)
        console.log(`\n👑 Hello This is ${app.getName()} 👑\n`+
        'No Debugging is allowed in location associated with gods \n')
    })
}