import { container } from 'tsyringe';

import './providers';

import IUsersRepository from './repositories/IUsersRepository';
import UsersRepository from './infra/typeorm/repositories/UsersRepository';

import IConfig from './config';
import Config from './config/implementation';

import IDeliverymenRepository from './repositories/IDeliverymenRepository';
import DeliverymenRepository from './infra/typeorm/repositories/DeliverymenRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDeliverymenRepository>(
  'DeliverymenRepository',
  DeliverymenRepository,
);

container.registerSingleton<IConfig>('UsersConfig', Config);
