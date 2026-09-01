import Fastify from "fastify";
import packageJson from "../package.json" with { type: "json" };

const app = Fastify({ logger: true });

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "0.0.0.0";

app.get("/health", async () => {
  return {
    status: "ok",
    service: "hayaxx-api",
    version: packageJson.version,
  };
});

try {
  await app.listen({ host, port });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}