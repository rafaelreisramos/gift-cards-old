async function routes(api, options) {
  api.get("/", async (request, response) => {
    return response.status(200).send({ hello: "world" });
  });
}

export default routes;
