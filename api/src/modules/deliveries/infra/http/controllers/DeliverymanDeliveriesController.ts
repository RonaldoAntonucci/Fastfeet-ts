import { Request, Response } from 'express';

import ListDeliverymanDeliveriesService from '@modules/deliveries/services/ListDeliverymanDeliveriesService';
import container from '@modules/deliveries/container';

export default class DeliverymanDeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: deliverymanId } = request.user;

    const listDeliverymanDeliveries = container.resolve(
      ListDeliverymanDeliveriesService,
    );

    const deliveriesData = await listDeliverymanDeliveries.run({
      deliverymanId,
    });

    return response.json(deliveriesData);
  }
}
