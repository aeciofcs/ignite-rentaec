import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { authenticateRoutes } from "./Authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./Specification.routes";
import { usersRoutes } from "./Users.routes";

const router = Router();

router.use("/categories", ensureAuthenticated, categoriesRoutes);
router.use("/specifications", ensureAuthenticated, specificationsRoutes);
router.use("/users", ensureAuthenticated, usersRoutes);
router.use(authenticateRoutes);

export { router };
