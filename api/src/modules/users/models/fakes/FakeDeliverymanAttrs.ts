import DeliverymanModel from '../DeliverymanModel';
import FakeUserAttrs from './FakeUserAttrs';

export default (attrs: Partial<DeliverymanModel> = {}): DeliverymanModel => {
  const deliveryman = new DeliverymanModel();

  const user = FakeUserAttrs({ role: 'deliveryman' });

  Object.assign(user, attrs);

  Object.assign(deliveryman, user);
  deliveryman.role = 'deliveryman';

  return deliveryman;
};
