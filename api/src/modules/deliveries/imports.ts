import AppError from 'shared/errors/AppError';
import DeliverymenRepository from '@modules/users/infra/typeorm/repositories/DeliverymenRepository';

const ServiceError = AppError;

// eslint-disable-next-line import/prefer-default-export
export { ServiceError, DeliverymenRepository };
