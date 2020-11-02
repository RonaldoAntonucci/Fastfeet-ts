import { getRepository } from 'typeorm';

import ICreateDeliveryDTO from '@modules/deliveries/dto/ICreateDeliveryDTO';
import IDeliveriesRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '../entities/Delivery';

export default class DeliveriesRepository implements IDeliveriesRepository {
  private ormRepository = getRepository(Delivery);

  public async create({
    adress,
    city,
    deliverymanId,
    neighborhood,
    postalCode,
    product,
    state,
  }: ICreateDeliveryDTO): Promise<Delivery> {
    const delivery = this.ormRepository.create({
      adress,
      city,
      deliverymanId,
      neighborhood,
      postalCode,
      product,
      state,
    });

    await this.ormRepository.save(delivery);

    return delivery;
  }
}
