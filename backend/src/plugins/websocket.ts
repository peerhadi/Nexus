import fp from "fastify-plugin";
import websocket from "@fastify/websocket";
import type { FastifyInstance } from "fastify";

async function websocketPlugin(app: FastifyInstance) {
  await app.register(websocket);
}

export default fp(websocketPlugin);
