import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ensureAdmin } from "@shared/Infra/HTTP/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/Infra/HTTP/middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createRentalController.handle
);

rentalRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    ensureAdmin,
    devolutionRentalController.handle
);

export { rentalRoutes };
