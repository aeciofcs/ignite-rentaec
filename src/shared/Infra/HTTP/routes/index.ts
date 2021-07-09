import { Router } from "express";

import { categoriesRoutes } from "@shared/Infra/HTTP/routes//categories.routes";
import { authenticateRoutes } from "@shared/Infra/HTTP/routes/Authenticate.routes";
import { carsRoutes } from "@shared/Infra/HTTP/routes/Cars.routes";
import { passwordRoutes } from "@shared/Infra/HTTP/routes/Password.routes";
import { rentalRoutes } from "@shared/Infra/HTTP/routes/Rentals.routes";
import { specificationsRoutes } from "@shared/Infra/HTTP/routes/Specification.routes";
import { usersRoutes } from "@shared/Infra/HTTP/routes/Users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes);

export { router };
