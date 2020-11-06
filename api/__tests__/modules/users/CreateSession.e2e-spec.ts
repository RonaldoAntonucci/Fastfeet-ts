import 'reflect-metadata';
import 'express-async-errors';
import request from 'supertest';

import User from '@modules/users/infra/typeorm/entities/User';
import { SessionsRouter } from '@modules/users';
import FakeUserAttrs from '@modules/users/models/fakes/FakeUserAttrs';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import TestApp from '../../util/TestApp';
import Factory, { IFactory } from '../../util/Factory';

describe('Create Session - e2e', () => {
  let app: TestApp;
  let hashProvider: IHashProvider;

  let usersFactory: IFactory<User>;

  beforeAll(async () => {
    app = new TestApp();
    await app.start({ routes: SessionsRouter });

    hashProvider = new BCryptHashProvider();

    usersFactory = Factory<User>('User', FakeUserAttrs);
  });

  it('should be able to create a new session(jwt) - e2e', async () => {
    const adminPassword = '12345678';
    const user = await usersFactory.create({
      password: await hashProvider.generateHash(adminPassword),
      role: 'admin',
    });

    const response = await request(app.http()).post('/').send({
      email: user.email,
      password: adminPassword,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id', user.id);
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('should not be able to create a new session if User email not exists.', async () => {
    const userAttrs = FakeUserAttrs();

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
    const user = await usersFactory.create({ role: 'admin' });

    const response = await request(app.http()).post('/').send({
      email: user.email,
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
