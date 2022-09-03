import { FastifyInstance } from "fastify/types/instance";

// export const WebsocketServer = async function (fastify: FastifyInstance) {

//   fastify.get('/__live/ws', { websocket: true }, (connection, req) => {

//     console.log("ws request")

//     connection.socket.on("close", () => console.log("close"))
//     connection.socket.on("error", () => console.log("error"))
//     connection.socket.on("open", () => console.log("open"))
//     connection.socket.on("ping", () => console.log("ping"))
//     connection.socket.on("pong", () => console.log("pong"))
//     connection.socket.on("unexpected-response", () => console.log("unexpected-response"))
//     connection.socket.on("upgrade", () => console.log("upgrade"))

//     connection.socket.on('message', message => {
//       // message.toString() === 'hi from client'

//       console.log("message, from 'on'")

//       connection.socket.send('hi from server, from "on"')
//     })

//     connection.socket.send('hi new connection')

//     connection.socket.onmessage = () => {
//       console.log("message, from 'onmessage'")

//       connection.socket.send('hi from server, from "onmessage"')
//     }

//   })
// }