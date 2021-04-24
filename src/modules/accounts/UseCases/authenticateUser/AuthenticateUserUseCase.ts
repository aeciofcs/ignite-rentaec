import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../Repositories/IUserRepository";

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
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // verificar se usuário existe
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Email ou Senha incorretos!");
        }

        // senha esta correta
        const passwordMath = await compare(password, user.password);
        if (!passwordMath) {
            throw new AppError("Email ou Senha incorretos!");
        }

        // gerar JsonWebToken = rentaec
        const token = sign({}, "e26d8a86cd2d2bfe4928f7908f1796a7", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
