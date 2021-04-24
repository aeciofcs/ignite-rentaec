import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/Repositories/Implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");
    try {
        const { sub: users_id } = verify(
            token,
            "e26d8a86cd2d2bfe4928f7908f1796a7"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(users_id);

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
