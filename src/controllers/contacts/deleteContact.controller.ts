import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import deleteContactService from "../../services/contacts/deleteContact.service";

const deleteContactController = async (req: Request, res: Response) => {
  await deleteContactService(req.contact);

  return res.status(StatusCodes.NO_CONTENT).send();
};

export default deleteContactController;
