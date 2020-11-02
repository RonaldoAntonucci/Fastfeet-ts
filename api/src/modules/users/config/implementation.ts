import config from '@config/auth';

import IConfig from '.';

export default class Config implements IConfig {
  jwt = config.jwt;
}
