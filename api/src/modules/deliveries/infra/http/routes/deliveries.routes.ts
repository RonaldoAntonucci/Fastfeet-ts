import { Router } from 'express';

import DeliveriesController from '../controllers/DeliveriesController';

const deliveriesRouter = Router();

const deliveriesController = new DeliveriesController();

deliveriesRouter.post('/', deliveriesController.create);

export default deliveriesRouter;
