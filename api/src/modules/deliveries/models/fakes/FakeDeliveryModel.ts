import DeliveryModel from '../DeliveryModel';

import { Faker } from '../../imports';

export default (attrs: Partial<DeliveryModel> = {}): DeliveryModel => {
  const delivery: DeliveryModel = {
    adress: Faker.address(),
    city: Faker.city(),
    neighborhood: Faker.province(),
    postalCode: Faker.postcode(),
    product: Faker.string(),
    state: Faker.state(),
  };

  return { ...delivery, ...attrs };
};
