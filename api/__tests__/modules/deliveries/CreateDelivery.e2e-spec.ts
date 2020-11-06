import 'reflect-metadata';
import 'express-async-errors';

import request from 'supertest';
import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import FakeDeliveryAttrs from '@modules/deliveries/models/fakes/FakeDeliveryAttrs';
import { DeliveriesRouter } from '@modules/deliveries';
import Deliveryman from '@modules/deliveries/infra/typeorm/entities/Deliveryman';
import FakeDeliverymanAttrs from '@modules/deliveries/models/fakes/FakeDeliverymanAttrs';
import createToken from '../../util/createToken';
import TestApp from '../../util/TestApp';
import Factory, { IFactory } from '../../util/Factory';

describe('Create Delivery - e2e', () => {
  let app: TestApp;
  let deliveriesRepo: Repository<Delivery>;

  let token: string;

  let deliverymanFactory: IFactory<Deliveryman>;

  beforeAll(async () => {
    app = new TestApp();
    await app.start({ routes: DeliveriesRouter });

    deliveriesRepo = getRepository(Delivery);

    token = createToken({ role: 'admin' });

    deliverymanFactory = Factory<Deliveryman>(
      'Deliveryman',
      FakeDeliverymanAttrs,
    );
  });

  it('should be able to create a new Delivery. - e2e', async () => {
    const deliveryman = await deliverymanFactory.create();
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
