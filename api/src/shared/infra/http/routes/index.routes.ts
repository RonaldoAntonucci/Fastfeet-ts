import { Router } from 'express';

import { UsersRouter, SessionsRouter } from '@modules/users';
import { DeliveriesRouter } from '@modules/deliveries';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/deliveries', DeliveriesRouter);

export default routes;
