import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IJwtProvider from '@modules/users/providers/JwtProvider/models/IJwtProvider';

import { ServiceError as AppError } from '../../../imports';

interface ITokenPayload extends Record<string, unknown> {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

interface IAuthRequest extends Request {
  user: {
    id: string;
  };
}

interface IAuthOptions {
  role?: string;
}

export default (opts: IAuthOptions = {}) => (
  request: IAuthRequest,
  _response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const JwtProvider = container.resolve<IJwtProvider>('JwtProvider');
    const decoded = JwtProvider.verify<ITokenPayload>(token);

    const { sub, role } = decoded;

    if (opts.role && opts.role !== role) {
      throw new AppError('User without permission', 401);
    }

    request.user = {
      id: sub,
    };

    return next();
  } catch (e) {
    if (e.message === 'User without permission') {
      throw new AppError(e.message, 401);
    }
    throw new AppError('Invalid JWT token', 401);
  }
};
