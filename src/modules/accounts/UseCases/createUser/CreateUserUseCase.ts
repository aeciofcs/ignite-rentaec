import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { IUserRepository } from "../../Repositories/IUserRepository";

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
