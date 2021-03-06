import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/Infra/HTTP/app";
import createConnection from "@shared/Infra/TypeORM";

let connection: Connection;

describe("List Categories", () => {
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

    it("should be able to list all categories", async () => {
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

        const response = await request(app).get("/categories");

        // console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest");
    });

    // it("should not be able to create a new category with name exists", async () => {});
});
