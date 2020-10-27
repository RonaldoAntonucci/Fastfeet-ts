import UserModel from '../UserModel';

import { Faker } from '../../imports';

export default (attrs: Partial<UserModel> = {}): Omit<UserModel, 'role'> => ({
  name: Faker.name(),
  email: Faker.email(),
  cpf: Faker.cpf(),
  password: Faker.string({ length: 16 }),
  ...attrs,
});
