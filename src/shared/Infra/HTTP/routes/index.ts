import { Router } from "express";

import { ensureAuthenticated } from "@shared/Infra/HTTP/middlewares/ensureAuthenticated";
import { categoriesRoutes } from "@shared/Infra/HTTP/routes//categories.routes";
import { authenticateRoutes } from "@shared/Infra/HTTP/routes/Authenticate.routes";
import { specificationsRoutes } from "@shared/Infra/HTTP/routes/Specification.routes";
import { usersRoutes } from "@shared/Infra/HTTP/routes/Users.routes";

const router = Router();

router.use("/categories", ensureAuthenticated, categoriesRoutes);
router.use("/specifications", ensureAuthenticated, specificationsRoutes);
router.use("/users", ensureAuthenticated, usersRoutes);
router.use(authenticateRoutes);

export { router };
