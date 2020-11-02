import { Router } from 'express';

import { UsersRouter, SessionsRouter } from '@modules/users';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
