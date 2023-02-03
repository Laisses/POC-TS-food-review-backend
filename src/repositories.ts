import { QueryResult } from "pg";
import {connection} from "./database";
import { Place, NewPlace, CountResult } from "./protocols";

export const selectPlaces = async (): Promise<QueryResult<Place>> => {
    return connection.query(`SELECT * FROM places ORDER BY id;`);
};

export const selectPlaceByName = async (name: string): Promise<QueryResult<Place>>=> {
    return connection.query(`SELECT * FROM places WHERE name=$1;`, [name]);
}

export const insertPlace = async ({name, category}: NewPlace) => {
    return connection.query(`INSERT INTO places (name, category) VALUES ($1, $2);`, [name, category]);
};

export const selectPlaceById = async (id: number): Promise<QueryResult<Place>> => {
    return connection.query(`SELECT * FROM places WHERE id=$1;`, [id]);
};

export const updatePlace = async ({name, category, id}: Place) => {
    return connection.query(`UPDATE places SET name=$1, category=$2 WHERE id=$3;`, [name, category, id]);
};

export const updateRatings = async (id: number, evaluation: string) => {
    return connection.query(`UPDATE places SET rating=$1 WHERE id=$2`, [evaluation, id]);
};

export const deletePlace = async (id: number) => {
    return connection.query(`DELETE FROM places WHERE ID=$1;`, [id]);
};

export const countPlaces = async (): Promise<QueryResult<CountResult>> => {
    return connection.query(`SELECT COUNT(*) FROM places;`);
};

export const countReviews = async (): Promise<QueryResult<CountResult>> => {
    return connection.query(`SELECT COUNT(rating) FROM places;`);
};