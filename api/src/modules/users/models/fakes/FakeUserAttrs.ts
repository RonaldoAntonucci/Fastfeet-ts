import UserModel from '../UserModel';

import { Faker } from '../../imports';

interface IFakeUser extends Omit<UserModel, 'role'> {
  role?: 'user' | 'admin' | 'deliveryman';
}

export default (attrs: Partial<UserModel> = {}): IFakeUser => ({
  name: Faker.name(),
  email: Faker.email(),
  cpf: Faker.cpf(),
  password: Faker.string({ length: 16 }),
  ...attrs,
});
