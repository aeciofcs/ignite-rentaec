import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/Infra/HTTP/app";
import createConnection from "@shared/Infra/TypeORM";

let connection: Connection;

describe("Create User Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "Aecio Test",
            email: "aecio@test.com.br",
            driver_license: "12346789",
            password: "aecio123",
        });

        expect(response.status).toBe(201);
    });
});
