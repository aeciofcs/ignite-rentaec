import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/DTOs/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/Infra/TypeORM/Entities/UserTokens";
import { IUsersTokensRepository } from "@modules/accounts/Repositories/IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }
}

export { UsersTokensRepository };
