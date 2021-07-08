import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import Auth from "@config/Auth";
import { IUsersTokensRepository } from "@modules/accounts/Repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayLoad {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayJSDateProvider")
        private dayJsDateProvider: IDateProvider
    ) {}
    async execute(token: string): Promise<string> {
        // Decodifica o token pegando o email e o id do usuário.
        const { email, sub: user_id } = verify(
            token,
            Auth.secret_refresh_token
        ) as IPayLoad;

        // verifica se o token existe.
        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!");
        }

        // Se existir , remove do banco de dados.
        await this.usersTokensRepository.deleteById(userToken.id);

        // Gerar novamente um novo refresh token para o usuario.
        const refresh_token = sign({ email }, Auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: Auth.expires_in_refresh_token,
        });

        const expires_date = this.dayJsDateProvider.addDays(
            Auth.expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        return refresh_token;
    }
}

export { RefreshTokenUseCase };
