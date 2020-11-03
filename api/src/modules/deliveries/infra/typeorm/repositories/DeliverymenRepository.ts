import { getRepository } from 'typeorm';

import IDeliverymenRepository from '../../../repositories/IDeliverymenRepository';
import Delivery from '../entities/Delivery';
import Deliveryman from '../entities/Deliveryman';

export default class DeliverymenRepository implements IDeliverymenRepository {
  private ormRepository = getRepository(Deliveryman);

  private ormDeliveriesRepository = getRepository(Delivery);

  public async findById(id: string): Promise<Deliveryman | undefined> {
    const deliveryman = this.ormRepository.findOne({ id, role: 'deliveryman' });

    return deliveryman;
  }

  public async findDeliveries(deliverymanId: string): Promise<Delivery[]> {
    const deliveries = await this.ormDeliveriesRepository.find({
      deliverymanId,
    });

    return deliveries;
  }
}
