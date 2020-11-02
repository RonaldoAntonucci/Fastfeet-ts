import ICreateDeliveryDTO from '@modules/deliveries/dto/ICreateDeliveryDTO';
import DeliveryModel from '@modules/deliveries/models/DeliveryModel';
import IDeliveriesRepository from '../IDeliveriesRepository';

export default class FakeDeliveriesRepository implements IDeliveriesRepository {
  public async create(data: ICreateDeliveryDTO): Promise<DeliveryModel> {
    const delivery = new DeliveryModel();
    Object.assign(delivery, data);
    delivery.id = Math.random().toString();
    delivery.createdAt = new Date();
    delivery.updatedAt = new Date();

    return delivery;
  }
}
