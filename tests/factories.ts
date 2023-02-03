import { NewPlace, Place } from "../src/protocols";
import { connection } from "../src/database";

export const insertPlace = async ({name, category}: NewPlace) => {
    return connection.query(`INSERT INTO places (name, category) VALUES ($1, $2);`, [name, category]);
};

export const updatePlace = async ({name, category, id}: Place) => {
    return connection.query(`UPDATE places SET name=$1, category=$2 WHERE id=$3;`, [name, category, id]);
};