import { getRepository } from 'typeorm';

import IDeliverymenRepository from '../../../repositories/IDeliverymenRepository';
import Deliveryman from '../entities/Deliveryman';

export default class DeliverymenRepository implements IDeliverymenRepository {
  private ormRepository = getRepository(Deliveryman);

  public async findById(id: string): Promise<Deliveryman | undefined> {
    const deliveryman = this.ormRepository.findOne({ id, role: 'deliveryman' });

    return deliveryman;
  }
}
