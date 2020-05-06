import { Router } from 'express';

import UserControll from './app/controllers/UserControll';
import SessionControll from './app/controllers/SessionControll';
import authVerify from './app/middlewares/authVerify';
import TaskControll from './app/controllers/TaskControll';
import MyTaskControll from './app/controllers/MyTaskControll';

const routes = new Router();

routes.post('/register', UserControll.create);
routes.post('/session', SessionControll.create);

/* Verify Token */

routes.use(authVerify);

/* User */

routes.get('/users', UserControll.index);
routes.put('/user', UserControll.update);
routes.delete('/user', UserControll.delete);

/* Task of User */

routes.get('/mytask', MyTaskControll.index);

/* Task */

routes.post('/task/new', TaskControll.create);
routes.get('/tasks', TaskControll.index);
routes.put('/task/:id', TaskControll.update);
routes.delete('/task/:id', TaskControll.delete);

export default routes;
