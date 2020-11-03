import DeliverymanModel from '../../models/DeliverymanModel';
import DeliveryModel from '../../models/DeliveryModel';
import IDeliverymenRepository from '../IDeliverymenRepository';

export default class FakeDeliverymenRepository
  implements IDeliverymenRepository {
  public async findById(id: string): Promise<DeliverymanModel | undefined> {
    const deliveryman = new DeliverymanModel();
    deliveryman.id = id;
    deliveryman.role = 'deliveryman';
    return deliveryman;
  }

  public async findDeliveries(): Promise<DeliveryModel[]> {
    return [] as DeliveryModel[];
  }
}
