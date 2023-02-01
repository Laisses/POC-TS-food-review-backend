import { Request, Response } from "express";
import { NewPlace, Place } from "./protocols";
import * as r from "./repositories";

export const health = (_req: Request, res: Response) => {
    res.send("OK");
};

export const getPlaces = async (_req: Request, res: Response) => {
    const placesList = await r.selectPlaces();
    return res.status(200).send(placesList.rows);
};

export const addPlace = async (req: Request, res: Response) => {
    const newPlace = req.body as NewPlace;
    await r.insertPlace(newPlace);
    return res.sendStatus(201);
};

export const editPlace = async (req: Request, res: Response) => {
    const { id } = req.params;
    const changes = req.body as NewPlace;
    const newPlace: Place = { id: Number(id), ...changes };

    await r.updatePlace(newPlace);

    return res.sendStatus(200);
};

export const editRating = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rating } = req.body as { rating: string };

    await r.updateRatings(Number(id), rating);

    return res.sendStatus(200);
};

export const removePlace = async (req: Request, res: Response) => {
    const {id} = req.params;

    await r.deletePlace(Number(id));

    return res.sendStatus(200);
};

export const listReviews = async (_req: Request, res: Response) => {
    const allPlaces = await r.countPlaces();
    const allReviews = await r.countReviews();

    return res.status(200).send({
        places: allPlaces.rows[0].count,
        reviews: allReviews.rows[0].count,
    });
};