import AppError from 'shared/errors/AppError';
import { EnsureAuthenticate as EnsureAuthenticateMiddleware } from '@modules/users/exports';

const ServiceError = AppError;

// eslint-disable-next-line import/prefer-default-export
export { ServiceError, EnsureAuthenticateMiddleware };
