import { Environment } from './environment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const nodeEnvironment = process.env.NODE_ENV || Environment.Dev;
export const apiPort = process.env.API_PORT || '8082';
export const corsAllowedOrigins = process.env.CORS_WHITELIST || '*';
export const logLevel = process.env.LOG_LEVEL;

// DB
export const dbUri = process.env.DB_URI;
export const dbLogging = process.env.DB_LOGGING;
