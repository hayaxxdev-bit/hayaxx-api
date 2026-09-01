import type { FastifyInstance } from "fastify";
import packageJson from "../../../package.json" with { type: "json" };
import { config } from "../../config/index.js";

export async function infoRoute(app: FastifyInstance): Promise<void> {
  app.get("/info", async () => {
    return {
      service: "hayaxx-api",
      version: packageJson.version,
      environment: config.environment,
    };
  });
}
