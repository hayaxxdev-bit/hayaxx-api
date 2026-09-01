import type { FastifyInstance } from "fastify";
import packageJson from "../../../package.json" with { type: "json" };

export async function rootRoute(app: FastifyInstance): Promise<void> {
  app.get("/", async () => {
    return {
      service: "hayaxx-api",
      version: packageJson.version,
      status: "ok",
    };
  });
}
