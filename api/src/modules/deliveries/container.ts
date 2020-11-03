import { container } from 'tsyringe';

import IDeliveriesRepository from './repositories/IDeliveriesRepository';
import DeliveriesRepository from './infra/typeorm/repositories/DeliveriesRepository';

import IDeliverymenRepository from './repositories/IDeliverymenRepository';
import DeliverymenRepository from './infra/typeorm/repositories/DeliverymenRepository';

const deliveriesContainer = container.createChildContainer();

deliveriesContainer.registerSingleton<IDeliveriesRepository>(
  'DeliveriesRepository',
  DeliveriesRepository,
);

deliveriesContainer.registerSingleton<IDeliverymenRepository>(
  'DeliverymenRepository',
  DeliverymenRepository,
);

export default deliveriesContainer;
