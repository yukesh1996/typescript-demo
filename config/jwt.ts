import { config } from 'dotenv';

config();

export default {
  expiresIn: process.env.JWT_EXPIRY,
  secret: process.env.JWT_SECRET as string,
};
