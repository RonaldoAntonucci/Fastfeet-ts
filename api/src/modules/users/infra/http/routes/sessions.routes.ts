import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import CreateSessionValidator from '../validators/CreateSessionValidator';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', CreateSessionValidator, sessionsController.create);

export default sessionsRouter;
