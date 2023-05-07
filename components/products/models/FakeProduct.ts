import { Product } from './Product';
import { faker } from '@faker-js/faker';

export const createFakeProduct = (): Product =>
    new Product({
        name: faker.commerce.productName(),
        quantity: faker.datatype.number({ min: 0, max: 100 }),
        price: parseFloat(faker.commerce.price()),
        imageUrl: faker.image.imageUrl(),
    });
