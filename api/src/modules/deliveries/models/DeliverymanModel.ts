import DeliveryModel from './DeliveryModel';

export default class DeliverymanModel {
  id?: string;

  role: 'deliveryman';

  deliveries?: DeliveryModel[];
}
