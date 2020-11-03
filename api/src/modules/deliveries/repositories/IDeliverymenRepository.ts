import DeliverymanModel from '../models/DeliverymanModel';
import DeliveryModel from '../models/DeliveryModel';

export default interface IDeliverymenRepository {
  findById(id: string): Promise<DeliverymanModel | undefined>;

  findDeliveries(deliverymanId: string): Promise<DeliveryModel[]>;
}
