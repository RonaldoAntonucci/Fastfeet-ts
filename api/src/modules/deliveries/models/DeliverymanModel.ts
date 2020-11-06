import DeliveryModel from './DeliveryModel';

export default class DeliverymanModel {
  id?: string;

  role: 'deliveryman';

  name: string;

  email: string;

  cpf: string;

  deliveries?: DeliveryModel[];

  password: string;
}
