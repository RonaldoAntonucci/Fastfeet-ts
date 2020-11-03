import DeliveryModel from '../models/DeliveryModel';

export default interface IDeliverymenRepository {
  findById(id: string): Promise<{ id: string } | undefined>;

  findDeliveries(deliverymanId: string): Promise<DeliveryModel[]>;
}
