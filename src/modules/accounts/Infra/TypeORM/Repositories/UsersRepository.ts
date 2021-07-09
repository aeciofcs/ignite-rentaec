import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUserDTO";
import { User } from "@modules/accounts/Infra/TypeORM/Entities/User";
import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";

class UsersRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        // username,
        email,
        driver_license,
        password,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            // username,
            email,
            password,
            driver_license,
            avatar,
            id,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
}

export { UsersRepository };
