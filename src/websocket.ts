import { FastifyInstance } from "fastify/types/instance";
import fs from "node:fs/promises"
import path from "node:path"
import * as WebSocket from 'ws';

const sockets: WebSocket[] = []

export const WebsocketServer = async function (fastify: FastifyInstance) {

  fastify.get('/__live/ws', { websocket: true }, (connection, req) => {

    sockets.push(connection.socket);

  })
};

(async () => {
  
  const assetPath = path.join(__dirname, '../../assets');

  const watcher = fs.watch(assetPath);

  for await (const event of watcher) {
    if (event.eventType === "change") {
      sockets.map(socket => socket.send(event.filename))
    }    
  }

})();