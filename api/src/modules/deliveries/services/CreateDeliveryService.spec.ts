import 'reflect-metadata';

import { ServiceError } from '../imports';

import DeliveryModel from '../models/DeliveryModel';
import FakeDeliveryModel from '../models/fakes/FakeDeliveryModel';
import FakeDeliveriesRepository from '../repositories/fakes/FakeDeliveriesRepository';
import FakeDeliverymenRepository from '../repositories/fakes/FakeDeliverymenRepository';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';
import IDeliverymenRepository from '../repositories/IDeliverymenRepository';
import CreateDeliveryService from './CreateDeliveryService';

describe('Create Delivery Service', () => {
  let service: CreateDeliveryService;
  let deliveriesRepo: IDeliveriesRepository;
  let deliverymenRepo: IDeliverymenRepository;

  let createDelivery: jest.SpyInstance;
  let checkDeliveryman: jest.SpyInstance;

  beforeEach(() => {
    deliveriesRepo = new FakeDeliveriesRepository();
    deliverymenRepo = new FakeDeliverymenRepository();
    service = new CreateDeliveryService(deliveriesRepo, deliverymenRepo);

    createDelivery = jest.spyOn(deliveriesRepo, 'create');
    checkDeliveryman = jest.spyOn(deliverymenRepo, 'findById');
  });

  it('should be able to create a new Delivery.', async () => {
    const deliveryAttrs = FakeDeliveryModel();
    deliveryAttrs.deliverymanId = 'fakeDeliverymanId';

    checkDeliveryman.mockImplementationOnce(() => true);

    const newDelivery = await service.run({
      ...deliveryAttrs,
      deliverymanId: deliveryAttrs.deliverymanId,
    });

    expect(newDelivery).toBeInstanceOf(DeliveryModel);
    expect(checkDeliveryman).toBeCalledWith(deliveryAttrs.deliverymanId);
    expect(createDelivery).toBeCalledWith(deliveryAttrs);
  });

  it('should not be able to create a new Delivery without valid Deliveryman Id.', async () => {
    const deliveryAttrs = FakeDeliveryModel();
    deliveryAttrs.deliverymanId = 'fakeDeliverymanId';

    checkDeliveryman.mockImplementationOnce(() => false);

    await expect(
      service.run({
        ...deliveryAttrs,
        deliverymanId: deliveryAttrs.deliverymanId,
      }),
    ).rejects.toEqual(new ServiceError('Invalid deliveryman id.'));

    expect(checkDeliveryman).toBeCalledWith(deliveryAttrs.deliverymanId);
    expect(createDelivery).not.toBeCalled();
  });
});
