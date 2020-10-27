import 'reflect-metadata';
import request from 'supertest';

import { UsersRouter } from '@modules/users';
import FakeUserAttrs from '@modules/users/models/fakes/FakeUserAttrs';
import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import TestApp from '../../util/TestApp';

describe('Create Users - e2e', () => {
  let app: TestApp;
  let usersRepo: Repository<User>;

  beforeAll(async () => {
    app = new TestApp();
    await app.start({ routes: UsersRouter });

    usersRepo = getRepository(User);
  });

  it('should be able to create a new User. - e2e', async () => {
    const usersAttrs = FakeUserAttrs();

    const response = await request(app.http()).post('/').send(usersAttrs);

    expect(response.status).toBe(200);

    // status
    const newUser = response.body;

    // response
    expect(newUser).toHaveProperty('id');
    expect(newUser).toHaveProperty('name', usersAttrs.name);
    expect(newUser).toHaveProperty('email', usersAttrs.email);
    expect(newUser).toHaveProperty('cpf', usersAttrs.cpf);
    expect(newUser).toHaveProperty('role', 'user');
    expect(newUser).not.toHaveProperty('password');
    expect(newUser).toHaveProperty('updatedAt');
    expect(newUser).toHaveProperty('createdAt');

    // persist
    const persistedUser = await usersRepo.findOne(newUser.id);
    expect(persistedUser).toHaveProperty('id', newUser.id);
    expect(persistedUser).toHaveProperty('name', newUser.name);
    expect(persistedUser).toHaveProperty('email', newUser.email);
    expect(persistedUser).toHaveProperty('cpf', newUser.cpf);
    expect(persistedUser).toHaveProperty('role', 'user');
    expect(persistedUser).toHaveProperty('password');
    expect(persistedUser?.password).not.toEqual(usersAttrs.password);
    expect(persistedUser).toHaveProperty(
      'updatedAt',
      new Date(newUser.updatedAt),
    );
    expect(persistedUser).toHaveProperty(
      'createdAt',
      new Date(newUser.createdAt),
    );
  });

  beforeEach(async () => {
    await app.truncate();
  });

  afterAll(async () => {
    await app.stop();
  });
});
