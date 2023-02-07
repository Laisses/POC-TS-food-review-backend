import { NewPlace, Place } from "../src/protocols";
import { connection } from "../src/database";
import { faker } from '@faker-js/faker';

export const fakerPlace = {
    name: faker.company.name(),
    category: faker.helpers.arrayElement(["restaurante", "bar", "pub", "café"]),
};

export const fakerRatings = {
    rating: faker.helpers.arrayElement(["terrible", "bad", "ok", "good", "great"]),
};

export const insertPlace = async () => {
    return connection.query(`INSERT INTO places (name, category) VALUES ($1, $2);`, [fakerPlace.name, fakerPlace.category]);
};

export const updatePlace = async ({id}) => {
    return connection.query(`UPDATE places SET name=$1, category=$2 WHERE id=$3;`, [fakerPlace.name, fakerPlace.category, id]);
};