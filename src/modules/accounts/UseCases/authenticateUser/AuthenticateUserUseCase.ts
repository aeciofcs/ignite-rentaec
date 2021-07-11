import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import Auth from "@config/Auth";
import { IUserRepository } from "@modules/accounts/Repositories/IUserRepository";
import { IUsersTokensRepository } from "@modules/accounts/Repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayJSDateProvider")
        private dayJsDateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // verificar se usuário existe
        const user = await this.usersRepository.findByEmail(email);
        const {
            secret_token,
            expires_in_token,
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_token_days,
        } = Auth;

        if (!user) {
            throw new AppError("Email incorreto!");
        }

        // senha esta correta
        const passwordMath = await compare(password, user.password);
        if (!passwordMath) {
            throw new AppError("Senha incorreta!");
        }

        // gerar JsonWebToken = rentaec
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(
            expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token,
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
