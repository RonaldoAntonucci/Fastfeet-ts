import { inject, injectable } from 'tsyringe';

import { ServiceError } from '../imports';
import DeliveryModel from '../models/DeliveryModel';
import IDeliverymenRepository from '../repositories/IDeliverymenRepository';

interface iRequestDTO {
  deliverymanId: string;
}

interface IResponse {
  results: DeliveryModel[];
}

@injectable()
export default class ListDeliverymanDeliveries {
  constructor(
    @inject('DeliverymenRepository')
    private deliverymenRepo: IDeliverymenRepository,
  ) {}

  public async run({ deliverymanId }: iRequestDTO): Promise<IResponse> {
    const deliveryman = await this.deliverymenRepo.findById(deliverymanId);

    if (!deliveryman) {
      throw new ServiceError('Invalid deliveryman id.');
    }

    const deliveries = await this.deliverymenRepo.findDeliveries(deliverymanId);

    return { results: deliveries };
  }
}
