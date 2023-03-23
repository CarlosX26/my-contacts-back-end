import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import updateContactService from "../../services/contacts/updateContact.service";

const updateContactController = async (req: Request, res: Response) => {
  const data = await updateContactService(req.contact, req.body);

  return res.status(StatusCodes.OK).json(data);
};

export default updateContactController;
