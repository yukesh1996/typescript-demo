import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser'
import { UserService } from '../services/userService';
import { AuthMiddleware } from '../middleware/authMiddleware';
import * as resHandler from "../handler/responseHandler";
export class AuthController {
  private userService: UserService;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.userService = new UserService();
    this.authMiddleware = new AuthMiddleware()
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.password = await this.userService.createHash(req.body.password)
      this.userService.createUser(req.body)
      resHandler.sendSuccess(res);
    } catch (error) {
      resHandler.sendError(res, error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {email, password} = req.body
      const userData: IUser = await this.userService.getUserByEmail(email);
      const isValid: boolean = await this.userService.compareHash(password, userData.password)
      if(!isValid) throw new Error('Invalid Login');
      const token: string = this.authMiddleware.signToken(userData.id)
      resHandler.sendSuccess(res, {token})
    } catch (error) {
      resHandler.sendError(res, error)
    }
  }

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userDetails: any = await this.userService.getUser({ id: 1 })
      resHandler.sendSuccess(res, userDetails);
    } catch (error) {
      resHandler.sendError(res, error)
    }
  }

}
