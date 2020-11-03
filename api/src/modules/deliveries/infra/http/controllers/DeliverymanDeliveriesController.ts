import ListDeliverymanDeliveriesService from '@modules/deliveries/services/ListDeliverymanDeliveriesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

interface IAuthRequest extends Request {
  user: { id: string };
}

export default class DeliverymanDeliveriesController {
  public async index(
    request: IAuthRequest,
    response: Response,
  ): Promise<Response> {
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
