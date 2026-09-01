import type { FastifyInstance } from "fastify";

export async function pingRoute(app: FastifyInstance): Promise<void> {
  app.get("/ping", async () => {
    return {
      status: "ok",
      message: "pong",
    };
  });
}
