import DeliverymanModel from './DeliverymanModel';

export default class DeliveryModel {
  id?: string;

  deliverymanId?: string;

  deliveryman?: DeliverymanModel;

  product: string;

  adress: string;

  postalCode: string;

  neighborhood: string;

  city: string;

  state: string;

  canceledAt?: Date;

  signatureId?: string;

  startDate?: Date;

  endDate?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
