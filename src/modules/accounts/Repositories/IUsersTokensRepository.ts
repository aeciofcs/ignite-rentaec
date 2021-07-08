import { ICreateUserTokenDTO } from "@modules/accounts/DTOs/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/Infra/TypeORM/Entities/UserTokens";

interface IUsersTokensRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens>;

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens>;

    deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
