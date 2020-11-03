import JsonWebToken from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IConfig from '@modules/users/config';

import IJwtProvider, { ISignDTO } from '../models/IJwtProvider';

type T = string | Record<string, unknown>;

@injectable()
export default class JsonWebTokenProvider implements IJwtProvider {
  private jwt = JsonWebToken;

  constructor(
    @inject('UsersConfig')
    private usersConfig: IConfig,
  ) {}

  sign({ payload = {}, subject }: ISignDTO): string {
    const { secret, expiresIn } = this.usersConfig.jwt;

    const token = this.jwt.sign(payload, secret, { subject, expiresIn });

    return token;
  }

  verify<K extends T>(token: string): K {
    const decode = this.jwt.verify(token, this.usersConfig.jwt.secret);

    return decode as K;
  }
}
