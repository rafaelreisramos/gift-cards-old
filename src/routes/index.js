async function routes(api) {
  api.get("/", async (request, reply) => {
    return reply.send({ hello: "world" });
  });
}

export default routes;
