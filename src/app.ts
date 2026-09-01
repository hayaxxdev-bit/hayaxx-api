import Fastify from "fastify";

import { rootRoute } from "./routes/system/root.js";
import { healthRoute } from "./routes/system/health.js";
import { infoRoute } from "./routes/system/info.js";
import { pingRoute } from "./routes/system/ping.js";
import { uptimeRoute } from "./routes/system/uptime.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(rootRoute);
  await app.register(healthRoute);
  await app.register(infoRoute);
  await app.register(pingRoute);
  await app.register(uptimeRoute);

  return app;
}
