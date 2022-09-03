import { fastify } from "./fastify";
import { handler } from "./react-ssr"
import Static from "@fastify/static";
import path from "node:path"

// import Websocket from "@fastify/websocket";
// import { WebsocketServer } from './websocket';
// fastify.register(Websocket);
// fastify.register(WebsocketServer)

fastify.register(Static, {
  root: path.join(__dirname, '../../assets'),
  prefix: '/assets/'
})

fastify.all('*', handler)


