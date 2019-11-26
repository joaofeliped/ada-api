import { Router } from 'express';
import CourseController from './app/controllers/CourseController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/courses', CourseController.store);
routes.get('/courses', CourseController.index);

export default routes;
