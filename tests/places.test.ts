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