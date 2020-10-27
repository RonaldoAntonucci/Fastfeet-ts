import UserModel from '../UserModel';

import { Faker } from '../../imports';

export default (attrs: Partial<UserModel> = {}): UserModel => ({
  name: Faker.name(),
  email: Faker.email(),
  cpf: Faker.cpf(),
  role: 'user',
  password: Faker.string({ length: 16 }),
  ...attrs,
});
