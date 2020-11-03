import { RequestHandler, Router } from 'express';

import { EnsureAuthenticateMiddleware } from '@modules/deliveries/imports';

import DeliveriesController from '../controllers/DeliveriesController';

import CreateDeliveryValidator from '../validators/CreateDeliveryValidator';

const deliveriesRouter = Router();

const deliveriesController = new DeliveriesController();

deliveriesRouter.use(
  EnsureAuthenticateMiddleware({ role: 'admin' }) as RequestHandler,
);

deliveriesRouter.post(
  '/',
  CreateDeliveryValidator(),
  deliveriesController.create,
);

export default deliveriesRouter;
