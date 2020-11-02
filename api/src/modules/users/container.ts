import { container } from 'tsyringe';

import './providers';

import IUsersRepository from './repositories/IUsersRepository';
import UsersRepository from './infra/typeorm/repositories/UsersRepository';

import IConfig from './config';
import Config from './config/implementation';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IConfig>('UsersConfig', Config);
