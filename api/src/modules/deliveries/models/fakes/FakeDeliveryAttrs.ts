import Chance from 'chance';

import DeliveryModel from '../DeliveryModel';

const Faker = Chance();

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
