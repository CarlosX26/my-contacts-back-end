import { Router } from "express";
import { clientSchema } from "../schemas/client.schema";
import createClientController from "../controllers/clients/createClient.controller";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import validateEmailMiddleware from "../middlewares/validateEmail.middleware";
import validatePhoneNumberMiddleware from "../middlewares/validatePhoneNumber.middleware";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";

const clientRouter = Router();

clientRouter.post(
  "",
  validateSchemaMiddleware(clientSchema),
  validateEmailMiddleware,
  validatePhoneNumberMiddleware,
  createClientController
);
clientRouter.get("/profile", validateTokenMiddleware);

export default clientRouter;
