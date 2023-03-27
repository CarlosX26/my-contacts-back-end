import { Router } from "express";
import authController from "../controllers/auth/auth.controller";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import { authSchema } from "../schemas/auth.schema";

const authRouter = Router();

authRouter.post("", validateSchemaMiddleware(authSchema), authController);

export default authRouter;
