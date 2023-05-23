import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import logger from "../../config/logger/Logger";
import APIResponse from "./APIResponse";
import Exception from "./Exception";


export function sendResponse(res: Response, result: any): Response {
  try {
    if (result && result.error && result.error.errorCode === 1) {
      return res.status(500).send(result);
    }

    // Internal server error
    if (result && result.error && result.error.errorCode === 2) {
      return res.status(400).send(result);
    }

    // Bad request
    if (
      result &&
      result.error &&
      (result.error.errorCode === 5 || result.error.errorCode === 6)
    ) {
      return res.status(401).send(result);
    }

    // Un-authorized
    if (result && result.error && result.error.errorCode === 4) {
      return res.status(409).send(result);
    } // Conflict and in duplicate data
    if (result && result.error && result.error.errorCode === 7) {
      return res.status(429).send(result);
    }
    // send status code 200
    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}


export function sendError(res: Response, err?: Exception): void {
  try {
    logger.error(err);
    let error = err?.err;
    if (err?.error) {
      error = err.error;
    }
    let errorCode = err?.errorCode || 1;
    let message;
    if (err instanceof ValidationError) {
      message = err.details;
      errorCode = 2;
    } else if (!err?.message) {
      message = "Internal Server Error";
    } else if (typeof err?.message === "string") {
      message = err?.message;
    } else {
      message = err.message;
    }

    console.log(message);

    let responseError: Exception;
    if (err instanceof ValidationError) {
      responseError = new Exception(errorCode, message[0], error);
      // responseError.message = ;
    } else {
      responseError = new Exception(errorCode, message, error);
      responseError.message = message;
    }

    const result = new APIResponse(false, responseError);
    sendResponse(res, result);
  } catch (error) {
    // Hopefully never happens...
    logger.error(error);
  }
}


export function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  sendError(res, err);
}


export function sendSuccessWithMsg(res: Response, message: string): void {
  try {
    const rslt = { message };
    const result = new APIResponse(true, rslt);
    sendResponse(res, result);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}


export function sendSuccess(res: Response, rslt = {}): void {
  try {
    const result = new APIResponse(true, rslt);
    sendResponse(res, result);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
