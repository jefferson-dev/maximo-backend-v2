import { Router } from 'express';

import UserControll from './app/controllers/UserControll';
import SessionControll from './app/controllers/SessionControll';
import authVerify from './app/middlewares/authVerify';
import TaskControll from './app/controllers/TaskControll';

const routes = new Router();

routes.post('/register', UserControll.create);
routes.post('/session', SessionControll.create);

routes.use(authVerify);

/* User */

routes.post('/task/new', TaskControll.create);
routes.get('/tasks', TaskControll.index);
routes.put('/task/:id', TaskControll.update);
routes.delete('/task/:id', TaskControll.delete);

/* Task */

export default routes;
