import DeliverymanModel from '../DeliverymanModel';

export default (attrs: Partial<DeliverymanModel> = {}): DeliverymanModel => {
  const deliveryman = new DeliverymanModel();

  Object.assign(deliveryman, attrs);
  deliveryman.role = 'deliveryman';

  return deliveryman;
};
