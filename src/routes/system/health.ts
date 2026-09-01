import type { FastifyInstance } from "fastify";
import packageJson from "../../../package.json" with { type: "json" };

export async function healthRoute(app: FastifyInstance): Promise<void> {
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "hayaxx-api",
      version: packageJson.version,
    };
  });
}
