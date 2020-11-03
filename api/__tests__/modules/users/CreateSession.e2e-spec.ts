import 'reflect-metadata';
import 'express-async-errors';
import request from 'supertest';

import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import { SessionsRouter } from '@modules/users';
import FakeUserAttrs from '@modules/users/models/fakes/FakeUserAttrs';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import TestApp from '../../util/TestApp';

describe('Create Session - e2e', () => {
  let app: TestApp;
  let usersRepo: Repository<User>;
  let hashProvider: IHashProvider;

  beforeAll(async () => {
    app = new TestApp();
    await app.start({ routes: SessionsRouter });

    hashProvider = new BCryptHashProvider();

    usersRepo = getRepository(User);
  });

  it('should be able to create a new session(jwt) - e2e', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.role = 'admin';

    const user = usersRepo.create({
      ...userAttrs,
      password: await hashProvider.generateHash(userAttrs.password),
    });
    await usersRepo.save(user);

    const response = await request(app.http()).post('/').send({
      email: userAttrs.email,
      password: userAttrs.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id', user.id);
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('should not be able to create a new session if User email not exists.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.role = 'admin';

    const response = await request(app.http()).post('/').send({
      email: userAttrs.email,
      password: userAttrs.password,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty(
      'message',
      'Incorrect email/password combination.',
    );
  });

  it('should not be able to create a new session with wrong password.', async () => {
    const userAttrs = FakeUserAttrs();
    userAttrs.role = 'admin';

    const user = usersRepo.create({
      ...userAttrs,
      password: await hashProvider.generateHash(userAttrs.password),
    });
    await usersRepo.save(user);

    const response = await request(app.http()).post('/').send({
      email: userAttrs.email,
      password: 'wrongPassword',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty(
      'message',
      'Incorrect email/password combination.',
    );
  });

  afterEach(async () => {
    await app.truncate();
  });

  afterAll(async () => {
    await app.stop();
  });
});
