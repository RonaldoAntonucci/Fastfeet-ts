import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IConfig from '@modules/users/config';

import IJwtProvider, { ISignDTO } from '../models/IJwtProvider';

@injectable()
export default class JsonWebTokenProvider implements IJwtProvider {
  constructor(
    @inject('UsersConfig')
    private usersConfig: IConfig,
  ) {}

  sign({ payload = {}, subject }: ISignDTO): string {
    console.log(this.usersConfig);
    const { secret, expiresIn } = this.usersConfig.jwt;

    const token = sign(payload, secret, { subject, expiresIn });

    return token;
  }
}
