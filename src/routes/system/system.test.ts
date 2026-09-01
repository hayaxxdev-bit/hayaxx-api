import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { buildApp } from "../../app.js";
import type { FastifyInstance } from "fastify";
import { config } from "../../config/index.js";

describe("system route contract", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    app.get("/error", async () => {
      throw new Error("test error");
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      service: "hayaxx-api",
      version: "0.2.0",
      status: "ok",
    });
  });

  it("GET /health", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      service: "hayaxx-api",
      version: "0.2.0",
    });
  });

  it("GET /ping", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/ping",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      message: "pong",
    });
  });

  it("GET /info", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/info",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      service: "hayaxx-api",
      version: "0.2.0",
      environment: config.environment,
    });
  });

  it("GET /uptime", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/uptime",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json() as { uptime: number };

    expect(body).toHaveProperty("uptime");
    expect(typeof body.uptime).toBe("number");
    expect(body.uptime).toBeGreaterThanOrEqual(0);
  });

  it("GET /does-not-exist", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/does-not-exist",
    });

    expect(response.statusCode).toBe(404);
  });

  it("GET /error", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/error",
    });

    expect(response.statusCode).toBe(500);

    const body = response.json() as { error: string };
    expect(body).toHaveProperty("error");
  });
});
