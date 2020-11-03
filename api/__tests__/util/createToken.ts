import JwtProvider from '@modules/users/providers/JwtProvider/implementations/JsonWebTokenProvider';
import authConfig from '@config/auth';
import { v4 as uuid } from 'uuid';

interface ICreateTokenOptions {
  payload?: Record<string, unknown>;
  role?: string;
  subject?: string;
}

export default (opts: ICreateTokenOptions = {}): string => {
  const jwtProvider = new JwtProvider(authConfig);

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
