import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import Auth from "@config/Auth";
import { UsersTokensRepository } from "@modules/accounts/Infra/TypeORM/Repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: users_id } = verify(
            token,
            Auth.secret_refresh_token
        ) as IPayload;

        const user = await usersTokensRepository.findByUserIdAndRefreshToken(
            users_id,
            token
        );

        if (!user) {
            throw new AppError("User does not exists!!", 401);
        }

        request.user = {
            id: users_id,
        };

        next();
    } catch (error) {
        throw new AppError("Invalid token!!", 401);
    }
}
