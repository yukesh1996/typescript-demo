import { Application, Router } from 'express';
import { validate } from "express-validation";

import * as resHandler from "../handler/responseHandler";
import { AuthController } from '../controllers/authController';
import {PostController} from '../controllers/postController';
import { AuthMiddleware } from '../middleware/authMiddleware';

// User Validation
import userValidation from '../middleware/validations/userValidation'
import postValidation from '../middleware/validations/postValidation'

export class AppRoutes {

  app: Application;

  private authController;
  private postController;
  private authMiddleware: AuthMiddleware

  constructor(app: Application) {
    this.app = app;
    this.authController = new AuthController();
    this.postController = new PostController();
    this.authMiddleware = new AuthMiddleware();
  }

  configureRoutes() {

    const routes = Router();
    const userRoutes = Router();
    const postRoutes = Router();

    // Open Routes
    routes.get('/health', (req, res) => resHandler.sendSuccess(res));

    // Auth Routes
    routes.post(
      '/signup', [
        (req, res, next) => {console.log(req.body); next()},
        validate(userValidation.rules.register, {}, {})
    ],
      this.authController.signup
    );

    routes.post('/login', [
      validate(
        userValidation.rules.login,
        { keyByField: true },
        { abortEarly: false }
      ),
    ], this.authController.login);

    // User Routes
    userRoutes.get('/', this.authController.getProfile);

    //Post Routes
    routes.post('/create', [
      validate(
        postValidation.rules.create,
        { keyByField: true },
        { abortEarly: false }
      ),
    ], this.postController.save);
    routes.put('/update/:postId', [
      validate(
        postValidation.rules.update,
        { keyByField: true },
        { abortEarly: false }
      ),
    ], this.postController.update);
    routes.get('/details/:postId', [
      validate(
        postValidation.rules.update,
        { keyByField: true },
        { abortEarly: false }
      ),
    ], this.postController.getPost);

    this.app.use('/api/post', this.authMiddleware.bearerAuth, postRoutes);
    this.app.use('/api/user', this.authMiddleware.bearerAuth, userRoutes);
    this.app.use('/api', routes);
  }

}
