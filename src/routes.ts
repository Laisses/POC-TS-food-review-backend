import * as h from "./handlers";
import * as m from "./middlewares";
import * as s from "./schemas";
import { Express } from "express";


export const routes = (app: Express) => {
    app.get("/health", h.health);

    app.get("/places", m.asyncError(h.getPlaces));
    app.post("/places", m.validate(s.PlaceSchema), m.asyncError(h.addPlace));
    app.put("/places/:id", m.validate(s.PlaceSchema), m.validateId, m.asyncError(h.editPlace));
    app.patch("/places/:id", m.validate(s.RatingSchema), m.validateId, m.asyncError(h.editRating));
    app.delete("/places/:id", m.validateId, m.asyncError(h.removePlace));

    app.get("/analytics", m.asyncError(h.listReviews));
};
