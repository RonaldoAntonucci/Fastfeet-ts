import 'reflect-metadata';
import 'express-async-errors';
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

    const response = await request(app.http())
      .post('/')
      .send({ ...usersAttrs, passwordConfirmation: usersAttrs.password });

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

  it('should no be able to create a new User if EMAIL is already in use. -e2e', async () => {
    const usersAttrs = FakeUserAttrs();

    const userExists = usersRepo.create({
      ...FakeUserAttrs(),
      email: usersAttrs.email,
      role: 'user',
    });
    await usersRepo.save(userExists);

    const response = await request(app.http())
      .post('/')
      .send({ ...usersAttrs, passwordConfirmation: usersAttrs.password });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty(
      'message',
      'This email is already in use.',
    );

    const count = await usersRepo.count();

    expect(count).toBe(1);
  });

  it('should no be able to create a new User if CPF is already in use. -e2e', async () => {
    const usersAttrs = FakeUserAttrs();

    const userExists = usersRepo.create({
      ...FakeUserAttrs(),
      cpf: usersAttrs.cpf,
      role: 'user',
    });
    await usersRepo.save(userExists);

    const response = await request(app.http())
      .post('/')
      .send({ ...usersAttrs, passwordConfirmation: usersAttrs.password });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty(
      'message',
      'This cpf is already in use.',
    );

    const count = await usersRepo.count();

    expect(count).toBe(1);
  });

  it('should no be able to create a new User without passwordConfirmation. -e2e', async () => {
    const usersAttrs = FakeUserAttrs();

    const response = await request(app.http()).post('/').send(usersAttrs);

    expect(response.status).toBe(400);

    const count = await usersRepo.count();

    expect(count).toBe(0);
  });

  beforeEach(async () => {
    await app.truncate();
  });

  afterAll(async () => {
    await app.stop();
  });
});
