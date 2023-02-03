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
