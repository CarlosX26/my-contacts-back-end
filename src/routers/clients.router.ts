import { Router } from "express";
import { clientSchema, clientUpdateSchema } from "../schemas/client.schema";
import createClientController from "../controllers/clients/createClient.controller";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import validateEmailMiddleware from "../middlewares/validateEmail.middleware";
import validatePhoneNumberMiddleware from "../middlewares/validatePhoneNumber.middleware";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import readClientController from "../controllers/clients/readClient.controller";
import updateClientController from "../controllers/clients/updateClient.controller";
import deleteClientController from "../controllers/clients/deleteClient.controller";

const clientRouter = Router();

clientRouter.post(
  "",
  validateSchemaMiddleware(clientSchema),
  validateEmailMiddleware,
  validatePhoneNumberMiddleware,
  createClientController
);
clientRouter.get("/profile", validateTokenMiddleware, readClientController);
clientRouter.patch(
  "/profile",
  validateSchemaMiddleware(clientUpdateSchema),
  updateClientController
);
clientRouter.delete(
  "/profile",
  validateTokenMiddleware,
  deleteClientController
);

export default clientRouter;
