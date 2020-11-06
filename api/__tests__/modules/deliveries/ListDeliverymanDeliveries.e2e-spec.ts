import 'reflect-metadata';
import 'express-async-errors';

import request from 'supertest';
import { v4 } from 'uuid';

import { DeliveriesRouter } from '@modules/deliveries';
import Deliveryman from '@modules/deliveries/infra/typeorm/entities/Deliveryman';
import FakeDeliverymanAttrs from '@modules/deliveries/models/fakes/FakeDeliverymanAttrs';
import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';
import FakeDeliveryAttrs from '@modules/deliveries/models/fakes/FakeDeliveryAttrs';

import TestApp from '../../util/TestApp';
import createToken from '../../util/createToken';
import Factory, { IFactory } from '../../util/Factory';

describe('List Deliveryman Deliveries - e2e', () => {
  let app: TestApp;

  let token: string;

  let deliverymanFactory: IFactory<Deliveryman>;
  let deliveriesFactory: IFactory<Delivery>;

  beforeAll(async () => {
    app = new TestApp();
    await app.start({ routes: DeliveriesRouter });

    token = createToken({ role: 'deliveryman' });

    deliverymanFactory = Factory<Deliveryman>(
      'Deliveryman',
      FakeDeliverymanAttrs,
    );

    deliveriesFactory = Factory<Delivery>('Delivery', FakeDeliveryAttrs);
  });

  it('should be able to list Deliveryman Deliveries.', async () => {
    const deliveryman = await deliverymanFactory.create();

    const deliveries = await deliveriesFactory.createMany(
      Number(deliveriesFactory.faker.string({ numeric: true, length: 2 })),
      { deliverymanId: deliveryman.id },
    );

    token = createToken({ subject: deliveryman.id, role: 'deliveryman' });

    const response = await request(app.http())
      .get('/me')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.results.length).toBe(deliveries.length);
  });

  it('should not be able to list Deliveries if deliveryman not exists.', async () => {
    token = createToken({ subject: v4(), role: 'deliveryman' });

    const response = await request(app.http())
      .get('/me')
      .set('Authorization', token);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Invalid deliveryman id.');
  });

  afterEach(async () => {
    await app.truncate();
  });

  afterAll(async () => {
    await app.stop();
  });
});
