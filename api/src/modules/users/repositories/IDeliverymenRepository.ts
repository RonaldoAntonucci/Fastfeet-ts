import DeliverymanModel from '../models/DeliverymanModel';

export default interface IDeliverymenRepository {
  findById(id: string): Promise<DeliverymanModel | undefined>;
}
