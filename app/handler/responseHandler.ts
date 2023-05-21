import { NextFunction } from 'express';

export class ResponseHandler {

  static handle = (req: any, res: any, next: NextFunction) => {

    res.errors = [];

    res.sendData = (data: any, headers: any) => {
      const resData = {
        headers: headers || req.body.headers || {},
        result: {
          status: true,
          message: 'Transaction completed successfully',
        },
        responseData: data,
        errors: null,
      };

      res.status(200).send(resData);
    };

    res.sendError = (err: any, field: any, message: any, vals: any) => {
      if (typeof err === 'string') {
        res.addErrorByCode(err,field,message,vals);
      } else if (err) {
        res.addErrorByObj(err,field,message,vals);
      }

      const resData = {
        headers: req.body.headers,
        result: {
          status: false,
          message: 'Transaction failed'
        },
        responseData: null,
        errors: res.errors,
      };

      const unauthorizedCodes = ['ERR002'];

      let statusCode = 400;

      if (res.errors && res.errors.length) {
        const isPresent = res.errors.find((error: { code: string; }) => unauthorizedCodes.includes(error.code));

        if (isPresent) {
          statusCode = 401;
        }
      }

      res.status(statusCode).send(resData);
    };

    next();
  }

}
