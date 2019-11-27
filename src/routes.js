import { Router } from 'express';
import CourseController from './app/controllers/CourseController';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/courses', CourseController.store);
routes.get('/courses', CourseController.index);

export default routes;
