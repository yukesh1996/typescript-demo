import { config } from 'dotenv';

config();

export default {
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
  },
};
