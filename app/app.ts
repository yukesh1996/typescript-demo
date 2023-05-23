import express, {
  Application
} from "express";

import Logger from "../config/logger/Logger";
import expressConfig from "../config/expressConfig";

export default async function createExpressApp(): Promise<Application> {
  const expressApp = express();
  await expressConfig(expressApp);
  expressApp.listen(expressApp.get("port"), () => {
    Logger.info(`SERVER RUNNING ON PORT ${expressApp.get("port")}`);
  });

  return expressApp;
}