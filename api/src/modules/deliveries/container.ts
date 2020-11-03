import { container } from 'tsyringe';

import IDeliveriesRepository from './repositories/IDeliveriesRepository';
import DeliveriesRepository from './infra/typeorm/repositories/DeliveriesRepository';

container.registerSingleton<IDeliveriesRepository>(
  'DeliveriesRepository',
  DeliveriesRepository,
);
