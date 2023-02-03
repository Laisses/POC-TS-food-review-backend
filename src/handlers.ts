import { Request, Response } from "express";
import { NewPlace, Place } from "./protocols";
import * as r from "./repositories";

export const health = (_req: Request, res: Response) => {
    res.status(200).send("OK");
};

export const getPlaces = async (_req: Request, res: Response) => {
    const placesList = await r.selectPlaces();
    return res.status(200).send(placesList.rows);
};

export const addPlace = async (req: Request, res: Response) => {
    const newPlace = req.body as NewPlace;
    const place = await r.selectPlaceByName(newPlace.name);

    if(place.rows[0]) {
        return res.sendStatus(409);
    }

    await r.insertPlace(newPlace);
    return res.sendStatus(201);
};

export const editPlace = async (req: Request, res: Response) => {
    const { id } = req.params;
    const changes = req.body as NewPlace;
    const newPlace: Place = { id: Number(id), ...changes };

    const place = await r.selectPlaceById(Number(id));

    if(!place.rows[0]) {
        res.sendStatus(404);
    }

    await r.updatePlace(newPlace);

    return res.sendStatus(200);
};

export const editRating = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rating } = req.body as { rating: string };

    const place = await r.selectPlaceById(Number(id));

    if(!place.rows[0]) {
        res.sendStatus(404);
    }

    await r.updateRatings(Number(id), rating);

    return res.sendStatus(200);
};

export const removePlace = async (req: Request, res: Response) => {
    const {id} = req.params;

    const place = await r.selectPlaceById(Number(id));

    if(!place.rows[0]) {
        res.sendStatus(404);
    }

    await r.deletePlace(Number(id));

    return res.sendStatus(200);
};

export const listReviews = async (_req: Request, res: Response) => {
    const allPlaces = await r.countPlaces();
    const allReviews = await r.countReviews();

    return res.status(200).send({
        places: Number(allPlaces.rows[0].count),
        reviews: Number(allReviews.rows[0].count),
    });
};