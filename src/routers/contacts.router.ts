import { Router } from "express";
import createContactController from "../controllers/contacts/createContact.controller";
import readAllContactsController from "../controllers/contacts/readAllContacts.controller";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import { contactSchema } from "../schemas/contact.schema";

const contactRouter = Router();

contactRouter.post(
  "",
  validateTokenMiddleware,
  validateSchemaMiddleware(contactSchema),
  createContactController
);
contactRouter.get("", validateTokenMiddleware, readAllContactsController);

export default contactRouter;
