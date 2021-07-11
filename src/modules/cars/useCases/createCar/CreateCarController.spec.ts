import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/Infra/HTTP/app";
import createConnection from "@shared/Infra/TypeORM";

let connection: Connection;

describe("Create Car Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const password = await hash("admin", 8);
        const id = uuid();
        await connection.query(
            `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
                        VALUES('${id}', 'admin', 'admin@rentaec.com.br', '${password}', true, 'now()', 'XXXXXXX')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new car", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentaec.com.br",
            password: "admin",
        });

        const { refresh_token } = responseToken.body;

        await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest",
                description: "Description Category Supertest",
            })
            .set({
                Authorization: `Bearer ${refresh_token}`,
            });

        const categories = await request(app).get("/categories");

        const response = await request(app)
            .post("/cars")
            .send({
                name: "ONIX",
                description: "ONIX CARRO DA GM MOTORS",
                daily_rate: 75.0,
                license_plate: "AEC-1234",
                fine_amount: 30.0,
                brand: "GM MOTORS",
                category_id: categories.body[0].id,
            })
            .set({
                Authorization: `Bearer ${refresh_token}`,
            });

        expect(response.status).toBe(201);
    });
});
