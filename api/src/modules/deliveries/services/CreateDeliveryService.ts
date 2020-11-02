import { inject, injectable } from 'tsyringe';

import { ServiceError } from '../imports';

import DeliveryModel from '../models/DeliveryModel';
import IDeliveriesRepository from '../repositories/IDeliveriesRepository';
import IDeliverymenRepository from '../repositories/IDeliverymenRepository';

interface IRequestDTO {
  deliverymanId: string;
  product: string;
  adress: string;
  postalCode: string;
  neighborhood: string;
  city: string;
  state: string;
}

@injectable()
export default class CreateDeliveryService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveriesRepo: IDeliveriesRepository,
    @inject('DeliverymenRepository')
    private deliverymenRepo: IDeliverymenRepository,
  ) {}

  public async run({
    adress,
    city,
    deliverymanId,
    neighborhood,
    postalCode,
    product,
    state,
  }: IRequestDTO): Promise<DeliveryModel> {
    const deliveryman = await this.deliverymenRepo.findById(deliverymanId);

    if (!deliveryman) {
      throw new ServiceError('Invalid deliveryman id.');
    }

    const delivery = await this.deliveriesRepo.create({
      adress,
      city,
      deliverymanId,
      neighborhood,
      postalCode,
      product,
      state,
    });

    return delivery;
  }
}
