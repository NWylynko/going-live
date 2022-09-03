import Fastify from "fastify";

export const fastify = Fastify({ logger: true });

fastify.listen({ port: 3000 }, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})