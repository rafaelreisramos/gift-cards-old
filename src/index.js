import Fastify from "fastify";
import routes from "./routes/index.js";

const app = Fastify({ logger: true });

app.register(routes);
app.setNotFoundHandler(notFoundHandler);
app.setErrorHandler(errorHandler);

app.listen({ port: 3000 }, (error, address) => {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }
  app.log.info(`Server is running on ${address}`);
});

async function notFoundHandler(req, reply) {
  const rawUrl = req.raw?.url?.split("?")[0] ?? req.url;
  const httpMethods = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
  ];

  const allowed = httpMethods.filter((method) =>
    this.hasRoute?.({ method, url: rawUrl }),
  );

  if (allowed.length > 0) {
    return reply
      .header("Allow", allowed.join(", "))
      .code(405)
      .send({
        statusCode: 405,
        error: "Method Not Allowed",
        message: `Method ${req.method} not allowed on ${req.url}`,
        action: `Allowed methods: ${allowed.join(", ")}`,
        name: "MethodNotAllowedError",
      });
  }

  return reply.code(404).send({
    statusCode: 404,
    error: "Not Found",
    message: `Route ${req.url} not found`,
    action: "Check the URL or method used",
    name: "NotFoundError",
  });
}

async function errorHandler(error, request, reply) {
  request.log.error(error);
  if (error.statusCode === 405) {
    reply.status(405).send({
      statusCode: 405,
      error: "Method Not Allowed",
      message: "Esta mensagem personalizada está funcionando!",
    });
  } else {
    reply.send(error);
  }
}
