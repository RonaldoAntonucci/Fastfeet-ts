import Chance from 'chance';
import DeliverymanModel from '../DeliverymanModel';

const faker = Chance();

export default (attrs: Partial<DeliverymanModel> = {}): DeliverymanModel => {
  const deliveryman = new DeliverymanModel();

  deliveryman.name = faker.name();
  deliveryman.email = faker.email();
  deliveryman.cpf = faker.cpf();
  deliveryman.password = faker.string({ length: 10, numeric: true });

  Object.assign(deliveryman, attrs);
  deliveryman.role = 'deliveryman';

  return deliveryman;
};
