import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAdmin } from "@shared/Infra/HTTP/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/Infra/HTTP/middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createRentalController.handle
);

export { rentalRoutes };
