import ICreateDeliveryDTO from '../dto/ICreateDeliveryDTO';
import DeliveryModel from '../models/DeliveryModel';

export default interface IDeliveriesRepository {
  create(data: ICreateDeliveryDTO): Promise<DeliveryModel>;
}
