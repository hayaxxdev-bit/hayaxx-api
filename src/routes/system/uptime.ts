import type { FastifyInstance } from "fastify";

export async function uptimeRoute(app: FastifyInstance): Promise<void> {
  app.get("/uptime", async () => {
    return {
      uptime: Math.floor(process.uptime()),
    };
  });
}
