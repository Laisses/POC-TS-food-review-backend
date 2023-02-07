import { NewPlace } from "../src/protocols";
import { connection } from "../src/database";
import { faker } from '@faker-js/faker';

export const fakerPlace: NewPlace = {
    name: faker.company.name(),
    category: faker.helpers.arrayElement(["restaurante", "bar", "pub", "café"]),
};

export const insertPlace = async () => {
    return connection.query(`INSERT INTO places (name, category) VALUES ($1, $2);`, [fakerPlace.name, fakerPlace.category]);
};
