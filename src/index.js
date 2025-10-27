import Fastify from "fastify";
import fastifyAllow from "fastify-allow";
import routes from "./routes/index.js";

const api = Fastify({ logger: true });

api.register(fastifyAllow);
api.register(routes);

api.listen({ port: 3000 }, (error, address) => {
  if (error) {
    api.log.error(error);
    process.exit(1);
  }
  api.log.info(`Server is running on ${address}`);
});

export default api;
