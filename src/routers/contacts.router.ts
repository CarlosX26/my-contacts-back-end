import { Router } from "express";
import { contactSchema, contactUpdateSchema } from "../schemas/contact.schema";
import createContactController from "../controllers/contacts/createContact.controller";
import deleteContactController from "../controllers/contacts/deleteContact.controller";
import readAllContactsController from "../controllers/contacts/readAllContacts.controller";
import updateContactController from "../controllers/contacts/updateContact.controller";
import checkContactExistsMiddleware from "../middlewares/checkContactExists.middleware";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";

const contactRouter = Router();

contactRouter.post(
  "",
  validateTokenMiddleware,
  validateSchemaMiddleware(contactSchema),
  createContactController
);
contactRouter.get("", validateTokenMiddleware, readAllContactsController);
contactRouter.patch(
  "/:id",
  validateTokenMiddleware,
  validateSchemaMiddleware(contactUpdateSchema),
  checkContactExistsMiddleware,
  updateContactController
);
contactRouter.delete(
  "/:id",
  validateTokenMiddleware,
  checkContactExistsMiddleware,
  deleteContactController
);

export default contactRouter;
