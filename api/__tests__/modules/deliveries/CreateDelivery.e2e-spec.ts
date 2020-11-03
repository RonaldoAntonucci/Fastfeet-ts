import 'reflect-metadata';
import 'express-async-errors';

import request from 'supertest';
import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import Deliveryman from '@modules/users/infra/typeorm/entities/Deliveryman';
import FakeDeliverymanAttrs from '@modules/users/models/fakes/FakeDeliverymanAttrs';
import FakeDeliveryAttrs from '@modules/deliveries/models/fakes/FakeDeliveryAttrs';
import { DeliveriesRouter } from '@modules/deliveries';
import { container } from 'tsyringe';
import IJwtProvider from '@modules/users/providers/JwtProvider/models/IJwtProvider';
import JsonWebTokenProvider from '@modules/users/providers/JwtProvider/implementations/JsonWebTokenProvider';
import UsersConfig from '@modules/users/config/implementation';
import DeliverymenRepository from '@modules/users/infra/typeorm/repositories/DeliverymenRepository';
import createToken from '../../util/createToken';
import TestApp from '../../util/TestApp';

describe('Create Delivery - e2e', () => {
  let app: TestApp;
  let deliveriesRepo: Repository<Delivery>;
  let deliverymenRepo: Repository<Deliveryman>;

  let token: string;

  beforeAll(async () => {
    app = new TestApp();
    await app.start({ routes: DeliveriesRouter });

    deliveriesRepo = getRepository(Delivery);
    deliverymenRepo = getRepository(Deliveryman);

    container.registerSingleton('UsersConfig', UsersConfig);

    container.registerSingleton<IJwtProvider>(
      'JwtProvider',
      JsonWebTokenProvider,
    );

    container.registerSingleton('DeliverymenRepository', DeliverymenRepository);

    token = createToken({ role: 'admin' });
  });

  it('should be able to create a new Delivery. - e2e', async () => {
    const deliveryman = deliverymenRepo.create(FakeDeliverymanAttrs());
    await deliverymenRepo.save(deliveryman);

    const deliveryAttrs = FakeDeliveryAttrs({ deliverymanId: deliveryman.id });

    const response = await request(app.http())
      .post('/')
      .set('Authorization', token)
      .send(deliveryAttrs);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('id');

    const delivery = {
      ...response.body,
      createdAt: new Date(response.body.createdAt),
      updatedAt: new Date(response.body.updatedAt),
    };

    const persistedDelivery = await deliveriesRepo.findOne({
      id: response.body.id,
    });

    expect(delivery).toEqual(persistedDelivery);

    expect(await deliveriesRepo.count()).toBe(1);
  });

  it('should not be able to create a new Delivery without valid deliveryman id.', async () => {
    const deliveryAttrs = FakeDeliveryAttrs({ deliverymanId: 'invalidUUID' });

    const response = await request(app.http())
      .post('/')
      .set('Authorization', token)
      .send(deliveryAttrs);

    expect(response.status).toBe(400);

    expect(await deliveriesRepo.count()).toBe(0);
  });

  it('should not be able to create a new Delivery if deliveryman not exists.', async () => {
    const deliveryAttrs = FakeDeliveryAttrs({ deliverymanId: uuid() });

    const response = await request(app.http())
      .post('/')
      .set('Authorization', token)
      .send(deliveryAttrs);

    expect(response.status).toBe(400);

    expect(await deliveriesRepo.count()).toBe(0);
  });

  it('should not be able to create a new Delivery if users is not authorized.', async () => {
    const invalidToken = createToken({ role: 'user' });

    const response = await request(app.http())
      .post('/')
      .set('Authorization', invalidToken)
      .send({});

    expect(response.status).toBe(401);
  });

  afterEach(async () => {
    await app.truncate();
  });

  afterAll(async () => {
    await app.stop();
  });
});
