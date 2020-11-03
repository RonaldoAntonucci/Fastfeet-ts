import { Request, Response } from 'express';

import ICreateDeliveryRequest from '@modules/deliveries/apiRequests/ICreateDeliveryRequest';
import CreateDeliveryService from '@modules/deliveries/services/CreateDeliveryService';
import container from '../../../container';

type ICreateRequest = Request<unknown, unknown, ICreateDeliveryRequest>;

export default class DeliveriesController {
  public async create(
    request: ICreateRequest,
    response: Response,
  ): Promise<Response> {
    const {
      adress,
      city,
      deliverymanId,
      neighborhood,
      postalCode,
      product,
      state,
    } = request.body;

    const createDelivery = container.resolve(CreateDeliveryService);

    const delivery = await createDelivery.run({
      adress,
      city,
      deliverymanId,
      neighborhood,
      postalCode,
      product,
      state,
    });

    return response.json(delivery);
  }
}
