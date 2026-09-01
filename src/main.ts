import Fastify from "fastify";

const app = Fastify({ logger: true });

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "0.0.0.0";

app.get("/health", async () => {
  return { 
    status: "ok",
    service: "hayaxx-api",
    version: "0.2.0"
  };
});

try {
  await app.listen({ host, port });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
