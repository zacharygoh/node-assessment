import socketio from "socket.io"

export default class WsTest {
    constructor(socket: socketio.Socket) {
        socket.on('test', data => {
            console.log("Hello World")
        })
    }
}