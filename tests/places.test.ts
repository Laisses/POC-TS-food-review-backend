import { app } from "server";
import supertest from "supertest";
import { connection } from "database";
import { faker } from '@faker-js/faker';
import * as f from "./factories";

const api = supertest(app);

beforeAll(async () => {
    await connection.query(`DELETE FROM places;`);
});

/* afterAll(async () => {
    await connection.query(`DELETE FROM places;`);
}); */

describe("GET /health", () => {
    it("should respond with status 200 and 'OK'", async () => {
        const health = await api.get("/health");
        expect(health.status).toBe(200);
        expect(health.text).toBe("OK");
    });
});

describe("GET /places", () => {
    it("should respond with status 200 and an empty array when there are no places created yet", async () => {
        const emptyPlaces = await api.get("/places");
        expect(emptyPlaces.status).toBe(200);
        expect(emptyPlaces.body).toEqual([]);
    });

    it("should respond with status 200 and an array of places", async () => {
        await f.insertPlace();

        const places = await api.get("/places");

        expect(places.status).toBe(200);
        expect(places.body).toMatchObject([
            {
                id: expect.any(Number),
                name: expect.any(String),
                category: expect.any(String),
            }
        ]);
    });
});

describe("POST /places", () => {
    it("should respond with status 201", async () => {
        const newPlace = {
            name: faker.company.name(),
            category: faker.helpers.arrayElement(["restaurante", "bar", "pub", "café"]),
        };

        const response = await api.post("/places").send(newPlace);
        expect(response.status).toBe(201);
    });

    it("should respond with status 409 if place name already exists", async () => {
        const places = await api.get("/places");
        const place = places.body[0];

        const response = await api.post("/places").send({
            name: place.name,
            category: place.category,
        });
        expect(response.status).toBe(409);
    });
});

describe("PUT /places/:id", () => {
    it("should respond with status 200", async () => {
        const places = await api.get("/places");
        const editedPlace = {
            name: faker.company.name(),
            category: faker.helpers.arrayElement(["restaurante", "bar", "pub", "café"]),
        };

        const response = await api.put(`/places/${places.body[0].id}`).send(editedPlace);

        expect(response.status).toBe(200);
    });

    it("should respond with status 404 if id can't be found", async () => {
        const response = await api.put(`/places/0`).send({
            name: "Ticiana Werner",
            category: "Restaurante",
        });

        expect(response.status).toBe(404);
    });
});

describe("PATCH /places/:id", () => {
    it("should respond with status 200", async () => {
        const places = await api.get("/places");
        const rating = faker.helpers.arrayElement(["terrible", "bad", "ok", "good", "great"]);

        const response = await api.patch(`/places/${places.body[0].id}`).send(rating);

        expect(response.status).toBe(200);
    });

    it("should respond with status 404 id the place id can't be found", async () => {
        const rating = faker.helpers.arrayElement(["terrible", "bad", "ok", "good", "great"]);
        const response = await api.patch(`/places/0`).send(rating);

        expect(response.status).toBe(404);
    });
});

describe("DELETE /places/:id", () => {
    it("should respond with status 200", async () => {
        const places = await api.get("/places");
        const response = await api.delete(`/places/${places.body[0].id}`);

        expect(response.status).toBe(200);
    });

    it("should respond with status 404 id the place id can't be found", async () => {
        const response = await api.delete(`/places/0`);

        expect(response.status).toBe(404);
    });
});

describe("GET /analytics", () => {
    it("should respond with status 200 and an object containing the counts", async () => {
        const analytics = await api.get("/analytics");

        expect(analytics.status).toBe(200);
        expect(analytics.body).toMatchObject({
            places: expect.any(Number),
            reviews: expect.any(Number),
        });
    });
});
