import 'reflect-metadata';

import { ServiceError } from '../imports';
import DeliveryModel from '../models/DeliveryModel';
import FakeDeliverymenRepository from '../repositories/fakes/FakeDeliverymenRepository';
import IDeliverymenRepository from '../repositories/IDeliverymenRepository';
import ListDeliverymanDeliveries from './ListDeliverymanDeliveriesService';

describe('List Deliveryman Deliveries.', () => {
  let service: ListDeliverymanDeliveries;
  let deliverymenRepo: IDeliverymenRepository;

  let findDeliveries: jest.SpyInstance;
  let checkDeliveryman: jest.SpyInstance;

  beforeEach(() => {
    deliverymenRepo = new FakeDeliverymenRepository();
    service = new ListDeliverymanDeliveries(deliverymenRepo);

    findDeliveries = jest.spyOn(deliverymenRepo, 'findDeliveries');
    checkDeliveryman = jest.spyOn(deliverymenRepo, 'findById');
  });

  it('should be able to list Deliveryman Deliveries.', async () => {
    checkDeliveryman.mockImplementationOnce(async () => true);

    findDeliveries.mockImplementationOnce(async () => [new DeliveryModel()]);

    const deliveries = await service.run({ deliverymanId: 'id' });

    expect(deliveries).toBeInstanceOf(Object);
    expect(deliveries.results).toBeInstanceOf(Array);
    deliveries.results.map(delivery =>
      expect(delivery).toBeInstanceOf(DeliveryModel),
    );
    expect(checkDeliveryman).toBeCalledWith('id');
    expect(findDeliveries).toBeCalledWith('id');
  });

  it('should not be able to list Deliveryman Deliveries if Deliveryman not exists.', async () => {
    checkDeliveryman.mockImplementationOnce(async () => undefined);

    await expect(service.run({ deliverymanId: 'id' })).rejects.toEqual(
      new ServiceError('Invalid deliveryman id.'),
    );

    expect(checkDeliveryman).toBeCalledWith('id');
    expect(findDeliveries).not.toBeCalled();
  });
});
