import Chance from 'chance';

import UserModel from '../UserModel';

interface IFakeUser extends Omit<UserModel, 'role'> {
  role?: 'user' | 'admin' | 'deliveryman';
}

const faker = Chance();

export default (attrs: Partial<UserModel> = {}): IFakeUser => {
  return {
    name: faker.name(),
    email: faker.email(),
    cpf: faker.cpf(),
    password: faker.string({ length: 16 }),
    role: 'user',
    ...attrs,
  };
};
