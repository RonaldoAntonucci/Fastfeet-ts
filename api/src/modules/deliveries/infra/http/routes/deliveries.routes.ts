import { Router } from 'express';

import DeliveriesController from '../controllers/DeliveriesController';

import CreateDeliveryValidator from '../validators/CreateDeliveryValidator';

const deliveriesRouter = Router();

const deliveriesController = new DeliveriesController();

deliveriesRouter.post(
  '/',
  CreateDeliveryValidator(),
  deliveriesController.create,
);

export default deliveriesRouter;
