import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute({
        name,
        // username,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists!");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            // username,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
