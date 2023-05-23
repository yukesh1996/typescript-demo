import { Application } from "express";
import { configureDB } from './app/models';
import Logger from "./config/logger/Logger";
import createExpressApp from "./app/app";

export default async function runServer(): Promise<any> {
  try {
    await configureDB();
    return createExpressApp();
  } catch (e) {
    Logger.error("Unable to start the server!", e);
    return e
  }
}

runServer().catch((err) => {
  Logger.error(`Server Error: ${err}`);
});
