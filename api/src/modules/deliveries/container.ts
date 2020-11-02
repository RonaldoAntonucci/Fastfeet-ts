import { container } from 'tsyringe';

import DeliverymenRepository from '@modules/users/infra/typeorm/repositories/DeliverymenRepository';

import IDeliverymenRepository from './repositories/IDeliverymenRepository';
import IDeliveriesRepository from './repositories/IDeliveriesRepository';
import DeliveriesRepository from './infra/typeorm/repositories/DeliveriesRepository';

container.registerSingleton<IDeliverymenRepository>(
  'DeliverymenRepository',
  DeliverymenRepository,
);

container.registerSingleton<IDeliveriesRepository>(
  'DeliveriesRepository',
  DeliveriesRepository,
);
