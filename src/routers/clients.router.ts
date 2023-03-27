import { Router } from "express";
import { clientSchema, clientUpdateSchema } from "../schemas/client.schema";
import createClientController from "../controllers/clients/createClient.controller";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import readClientController from "../controllers/clients/readClient.controller";
import updateClientController from "../controllers/clients/updateClient.controller";
import deleteClientController from "../controllers/clients/deleteClient.controller";
import validateEmailExistsMiddleware from "../middlewares/validateEmailExists.middleware";
import validatePhoneNumberExistsMiddleware from "../middlewares/validatePhoneNumberExists.middleware";

const clientRouter = Router();

clientRouter.post(
  "",
  validateSchemaMiddleware(clientSchema),
  validateEmailExistsMiddleware,
  validatePhoneNumberExistsMiddleware,
  createClientController
);
clientRouter.get("/profile", validateTokenMiddleware, readClientController);
clientRouter.patch(
  "/profile",
  validateTokenMiddleware,
  validateSchemaMiddleware(clientUpdateSchema),
  validateEmailExistsMiddleware,
  validatePhoneNumberExistsMiddleware,
  updateClientController
);
clientRouter.delete(
  "/profile",
  validateTokenMiddleware,
  deleteClientController
);

export default clientRouter;
