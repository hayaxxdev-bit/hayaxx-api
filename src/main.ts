import Fastify from "fastify";
import packageJson from "../package.json" with { type: "json" };

const app = Fastify({ logger: true });

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "0.0.0.0";

app.get("/", async () => {
  return {
    service: "hayaxx-api",
    version: packageJson.version,
    status: "ok"
  };
});

app.get("/health", async () => {
  return {
    status: "ok",
    service: "hayaxx-api",
    version: packageJson.version,
  };
});

app.get("/ping", async () => {
  return {
    status: "ok",
    message: "pong"
  }
})

app.get("/info", async () => {
  return {
    service: "hayaxx-api",
    version: packageJson.version,
    environment: process.env.NODE_ENV ?? "development"
  }
})

app.get("/uptime", async () => {
  return {
    "uptime": Math.floor(process.uptime())
  }
})

try {
  await app.listen({ host, port });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
