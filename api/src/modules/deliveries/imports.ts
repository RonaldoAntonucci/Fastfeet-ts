import Chance from 'chance';
import AppError from 'shared/errors/AppError';

const Faker = Chance();

const ServiceError = AppError;

export { Faker, ServiceError };
