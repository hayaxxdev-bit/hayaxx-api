const DEFAULT_HOST = "0.0.0.0";
const DEFAULT_PORT = 3001;
const DEFAULT_ENVIRONMENT = "development";

const rawPort = process.env.PORT;

const port = rawPort === undefined
    ? DEFAULT_PORT
    : Number(rawPort);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
        `Invalid PORT: "${rawPort}". PORT must be an integer between 1 and 65535.`
    );
}

const rawEnvironment = process.env.NODE_ENV;

const environment =
    rawEnvironment === undefined
        ? DEFAULT_ENVIRONMENT
        : rawEnvironment;

if (
    environment !== "development" &&
    environment !== "production" &&
    environment !== "test"
) {
    throw new Error(
        `Invalid NODE_ENV: "${environment}". Expected development, production, or test.`
    );
}

export const config = {
    host: process.env.HOST ?? DEFAULT_HOST,
    port,
    environment
} as const;
