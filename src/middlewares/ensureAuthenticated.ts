import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

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
        throw new Error("Token missing");
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
            throw new Error("User does not exists!!");
        }

        next();
    } catch (error) {
        throw new Error("Invalid token!!");
    }
}
