import cors from 'cors';
import express, { Express } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import path from 'path';
import { AppRoutes } from './routes';
import compression from 'compression';
import { ResponseHandler } from './handler/responseHandler';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'templates'));
app.use('/api/assets', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.APP_HOST,
  credentials: true,
  exposedHeaders: 'x-csrf-token',
}));
app.use(logger('dev'));
app.set('trust proxy', 1);
app.use(cookieParser());

app.use(passport.initialize());

app.use(ResponseHandler.handle);

new AppRoutes(app).configure();

export default app;
