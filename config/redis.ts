import { config } from 'dotenv';

config();

export default {
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  IO_REDIS_HOST: process.env.IO_REDIS_HOST as string,
};
