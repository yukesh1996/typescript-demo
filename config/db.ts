import { config } from 'dotenv';

config();

export default {
  development: {
    username: process.env.DB_USER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    pool: {
      min: Number(process.env.DB_CONNECTIONS_MIN),
      max: Number(process.env.DB_CONNECTIONS_MAX),
      idle: Number(process.env.DB_CONNECTION_TIMEOUT),
      acquire: Number(process.env.DB_CONNECTION_IDLE),
    },
  },
  test: {
    username: process.env.DB_USER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    pool: {
      min: Number(process.env.DB_CONNECTIONS_MIN),
      max: Number(process.env.DB_CONNECTIONS_MAX),
      idle: Number(process.env.DB_CONNECTION_TIMEOUT),
      acquire: Number(process.env.DB_CONNECTION_IDLE),
    },
  },
  production: {
    username: process.env.DB_USER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    pool: {
      min: Number(process.env.DB_CONNECTIONS_MIN),
      max: Number(process.env.DB_CONNECTIONS_MAX),
      idle: Number(process.env.DB_CONNECTION_TIMEOUT),
      acquire: Number(process.env.DB_CONNECTION_IDLE),
    },
  }
}
