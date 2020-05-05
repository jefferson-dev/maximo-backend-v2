import { Router } from 'express';

import UserControll from './app/controllers/UserControll';
import SessionControll from './app/controllers/SessionControll';
import authVerify from './app/middlewares/authVerify';

const routes = new Router();

routes.post('/register', UserControll.create);
routes.post('/session', SessionControll.create);

routes.use(authVerify);

routes.get('/users', UserControll.index);
routes.put('/user', UserControll.update);
routes.delete('/user', UserControll.delete);

export default routes;
