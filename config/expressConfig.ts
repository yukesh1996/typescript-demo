import cors from "cors";
import helmet from "helmet";
import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser';
import compression from 'compression';
import logger from "morgan";
import Logger from "./logger/Logger";
import LoggerStreamAdapter from "./logger/LoggerStreamAdapter";
import { AppRoutes } from '../app/routes';
const {PORT} = process.env

// Start export the app modules
export default async (
  expressApp: Application,
): Promise<void> => {
  const corsOptions = {
    origin: /optisolbusiness\.com|localhost.*$/,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200, //
  };
  expressApp.use(cors(corsOptions));
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: true }));
  expressApp.use(express.json());
  expressApp.use(compression());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(logger("dev", { stream: LoggerStreamAdapter.toStream(Logger) }));
  expressApp.disable("x-powered-by");
  expressApp.set("port", PORT || 3000);
  expressApp.use(helmet());
  new AppRoutes(expressApp).configureRoutes();
};
