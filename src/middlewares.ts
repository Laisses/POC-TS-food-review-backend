import { Request, Response, NextFunction } from "express";
import { NewPlace } from "./protocols";
import { validator } from "./schemas"
import * as r from "./repositories";

export const asyncError = handlerFn => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await handlerFn(req, res, next);
    } catch (err) {
        console.warn(err);
        res.sendStatus(500);
    }
};

export const validate = schema => (req: Request, res: Response, next: NextFunction) => {
    const payload: NewPlace = req.body;
    const { error } = validator(schema, payload);

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    next();
};

export const validateId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const place = await r.selectPlaceById(Number(id));

    if (!place.rows[0]) {
        return res.status(404).send({ message: "could not find specified place" });
    }

    next();
};