import IDeliverymenRepository from '../IDeliverymenRepository';

export default class FakeDeliverymenRepository
  implements IDeliverymenRepository {
  public async findById(id: string): Promise<{ id: string } | undefined> {
    return { id };
  }
}
