import { Router } from 'express';

import { UsersRouter } from '@modules/users';

const routes = Router();

routes.use('/users', UsersRouter);

export default routes;
