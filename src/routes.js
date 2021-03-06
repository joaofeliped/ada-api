import { Router } from 'express';
import CourseController from './app/controllers/CourseController';

// import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';

import SessionController from './app/controllers/SessionController';
import CommentController from './app/controllers/CommentController';

import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);
routes.get('/posts', PostController.index);

routes.post('/courses', CourseController.store);
routes.get('/courses', CourseController.index);

routes.post('/course/:courseId/posts', PostController.store);
routes.get('/course/:courseId/posts', PostController.index);

routes.post('/course/:courseId/posts/:postId', CommentController.store);
routes.post('/subscriptions/:courseId', SubscriptionController.store);

export default routes;
