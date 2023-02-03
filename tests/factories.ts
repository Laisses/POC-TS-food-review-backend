import { NewPlace } from "../src/protocols";
import { connection } from "../src/database";

export const insertPlace = async ({name, category}: NewPlace) => {
    return connection.query(`INSERT INTO places (name, category) VALUES ($1, $2);`, [name, category]);
};