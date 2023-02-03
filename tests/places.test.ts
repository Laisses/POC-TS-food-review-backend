import { app } from "server";
import supertest from "supertest";
import { connection } from "database";
import * as f from "./factories";

const api = supertest(app);

beforeAll(async () => {
    await connection.query(`DELETE FROM places;`);
});

afterAll(async () => {
    await connection.query(`DELETE FROM places;`);
});

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
        const restaurante = {name: "Beirute", category: "Restaurante"};
        await f.insertPlace(restaurante);

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
        const place = await api.post("/places").send({
            name: "DOM",
            category: "Restaurante"
        });
        expect(place.status).toBe(201);
    });

    it("should respond with status 409 if place name already exists", async() => {
        const place = await api.post("/places").send({
            name: "DOM",
            category: "Restaurante"
        });
        expect(place.status).toBe(409);
    });
});

describe("PUT /places/:id", () => {
    it("should respond with status 200", async () => {
        const places = await api.get("/places");

        const response = await api.put(`/places/${places.body[0].id}`).send({
            name: "Ticiana Werner",
            category: "Restaurante",
        });

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


