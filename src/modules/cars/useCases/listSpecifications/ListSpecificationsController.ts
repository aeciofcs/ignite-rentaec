import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSpecificationsUseCase = container.resolve(
            ListSpecificationUseCase
        );

        const all = await listSpecificationsUseCase.execute();

        return response.json(all);
    }
}

export { ListSpecificationsController };
