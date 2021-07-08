import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/UseCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/UseCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
