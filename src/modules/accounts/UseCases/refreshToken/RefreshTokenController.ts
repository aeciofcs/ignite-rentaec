import { Request, Response } from "express";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        return response.status(201).json();
    }
}

export { RefreshTokenController };
