import { RequestHandler, Router } from 'express';

import { EnsureAuthenticateMiddleware } from '@modules/deliveries/imports';

import DeliveriesController from '../controllers/DeliveriesController';

import CreateDeliveryValidator from '../validators/CreateDeliveryValidator';
import DeliverymanDeliveriesController from '../controllers/DeliverymanDeliveriesController';

const deliveriesRouter = Router();

const deliveriesController = new DeliveriesController();
const deliverymanDeliveriesController = new DeliverymanDeliveriesController();

deliveriesRouter.get(
  '/me',
  EnsureAuthenticateMiddleware({ role: 'deliveryman' }) as RequestHandler,
  deliverymanDeliveriesController.index,
);

deliveriesRouter.post(
  '/',
  EnsureAuthenticateMiddleware({ role: 'admin' }) as RequestHandler,
  CreateDeliveryValidator(),
  deliveriesController.create,
);

export default deliveriesRouter;
