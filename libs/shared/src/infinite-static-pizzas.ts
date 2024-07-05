import { faker } from '@faker-js/faker';
import { times } from 'lodash';

export const INFINITE_STATIC_PIZZAS = Array.from({ length: 100 }).map(() => ({
  name: `${faker.commerce.product()} Pizza`,
  rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  ingredients: times(faker.number.int({ min: 1, max: 3 }), () =>
    faker.lorem.words({ min: 1, max: 3 })
  ),
  instructions: times(faker.number.int({ min: 2, max: 4 }), () =>
    faker.lorem.sentence()
  ),
  imageUrl: faker.image.urlLoremFlickr({
    category: 'food',
    height: 300,
    width: 300,
  }),
}));
