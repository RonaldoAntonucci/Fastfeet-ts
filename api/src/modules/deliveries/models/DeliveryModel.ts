export default class DeliveryModel {
  id?: string;

  deliverymanId?: string;

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
