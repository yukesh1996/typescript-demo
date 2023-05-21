import { NextFunction } from 'express';
import { compare, hash } from 'bcrypt';
import { User } from '../interfaces/User'
import { UserService } from '../services/userService';
import { AuthMiddleware } from '../middleware/authMiddleware';

export class AuthController {
  private userService: UserService;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.userService = new UserService();
    this.authMiddleware = new AuthMiddleware()
  }

  createHash = (plainText: string) => {
    return hash(plainText, 10);
  }

  compareHash = (plainText: string, hashedStr: string) => {
    return compare(plainText, hashedStr);
  }

  signup = async (req: any, res: any, next: NextFunction) => {
    try {
      req.reqBody.password = this.createHash(req.reqBody.password)
      this.userService.createUser(req.reqBody)
      res.sendData();
    } catch (error) {
      res.sendError(error)
    }
  }

  login = async (req: any, res: any, next: NextFunction) => {
    try {
      const details: any = await this.userService.getUserByEmail({email: req.reqBody.email});
      const isValid: boolean = await this.compareHash(req.reqBody.password, details.password)
      if(!isValid) throw 'Invalid Login';
      const token: string = this.authMiddleware.signToken(details.id)
      res.sendData({token})
    } catch (error) {
      res.sendError(error)
    }
  }

  updateProfile = async (req: any, res: any, next: NextFunction) => {
    try {
      await this.userService.updateUser(req.reqBody)
      res.sendData({ success: true });
    } catch (error) {
      res.sendError(error)
    }
  }

  getProfile = async (req: any, res: any, next: NextFunction) => {
    try {
      const userDetails: any = await this.userService.getUser({ id: req.user.id })
      res.sendData(userDetails);
    } catch (error) {
      res.sendError(error)
    }
  }

}
