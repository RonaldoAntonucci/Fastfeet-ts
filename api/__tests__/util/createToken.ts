import { v4 as uuid } from 'uuid';
import { container } from 'tsyringe';

import authConfig from '@config/auth';

import UsersConfig from '@modules/users/config/implementation';
import IJwtProvider from '@modules/users/providers/JwtProvider/models/IJwtProvider';
import JsonWebTokenProvider from '@modules/users/providers/JwtProvider/implementations/JsonWebTokenProvider';

container.registerSingleton('UsersConfig', UsersConfig);

container.registerSingleton<IJwtProvider>('JwtProvider', JsonWebTokenProvider);

interface ICreateTokenOptions {
  payload?: Record<string, unknown>;
  role?: string;
  subject?: string;
}

export default (opts: ICreateTokenOptions = {}): string => {
  const jwtProvider = new JsonWebTokenProvider(authConfig);

  const payload: Record<string, unknown> = { ...opts.payload };
  if (opts.role) {
    payload.role = opts.role;
  }

  const token = `Bearer ${jwtProvider.sign({
    subject: opts.subject || uuid(),
    payload,
  })}`;

  return token;
};
