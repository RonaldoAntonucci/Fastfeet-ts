import DeliveryModel from '@modules/deliveries/models/DeliveryModel';
import IDeliverymenRepository from '../IDeliverymenRepository';

export default class FakeDeliverymenRepository
  implements IDeliverymenRepository {
  public async findById(id: string): Promise<{ id: string } | undefined> {
    return { id };
  }

  public async findDeliveries(): Promise<DeliveryModel[]> {
    return [] as DeliveryModel[];
  }
}
