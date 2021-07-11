import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to create a new user", async () => {
        const user: ICreateUserDTO = {
            name: "Aecio Test",
            email: "aecio@test.com.br",
            driver_license: "1901758",
            password: "aecio123",
        };

        await createUserUseCase.execute(user);

        const newUser = await usersRepositoryInMemory.findByEmail(
            "aecio@test.com.br"
        );

        expect(newUser).toHaveProperty("id");
    });

    it("Should not be able to create a user if already exists", async () => {
        const user1: ICreateUserDTO = {
            name: "Aecio Test",
            email: "aecio@test.com.br",
            driver_license: "1901758",
            password: "aecio123",
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "Aecio Test 2",
            email: "aecio@test.com.br",
            driver_license: "159487",
            password: "aecio321",
        };

        await expect(createUserUseCase.execute(user2)).rejects.toEqual(
            new AppError("User already exists!")
        );
    });
});
