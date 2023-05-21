import { NextFunction, Request, Response } from 'express';
import { UserService } from "../services/userService";
import jwt from "jsonwebtoken";

export class AuthMiddleware {

  private userService: UserService;
  private secretKey: string = '1234'
  constructor() {
    this.userService = new UserService();
  }

  signToken = (id: number) => {
    return jwt.sign({ id }, this.secretKey);
   }

  validateToken = (token: string) => {
   return jwt.verify(token, this.secretKey);
  }

  bearerAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token : string = req.headers.authorization;
      req.user = this.validateToken(token)
      next()
    } else {
      res.status(401).send();
    }
  }

}
