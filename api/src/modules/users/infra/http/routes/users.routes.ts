import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import CreateUserValidator from '../validators/CreateUserValidator';

const UsersRouter = Router();

const usersController = new UsersController();

UsersRouter.post('/', CreateUserValidator(), usersController.create);

export default UsersRouter;
