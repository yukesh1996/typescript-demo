import { Application, Router } from 'express';
import { AuthController } from './controllers/authController';
import { AuthMiddleware } from './middleware/authMiddleware';

export class AppRoutes {

  app: Application;

  private authController;
  private authMiddleware: AuthMiddleware
  private routes: Router;
  private userRoutes: Router;
  constructor(app: Application) {
    this.app = app;
    this.authController = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.routes = Router()
    this.userRoutes = Router()
  }

  configure() {

    //Open Routes
    this.routes.post('/login', this.authController.login);
    this.routes.post('/signup', this.authController.signup);

    //User Routes
    this.userRoutes.patch('/update', this.authController.updateProfile);
    this.userRoutes.get('/', this.authController.getProfile);

    this.app.use('/api/user',  this.authMiddleware.bearerAuth, this.userRoutes);
    this.app.use('/api', this.routes);
  }

}
