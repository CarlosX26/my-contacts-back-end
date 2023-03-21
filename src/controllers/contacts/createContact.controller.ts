import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import createContactService from "../../services/contacts/createContact.service";

const createContactController = async (req: Request, res: Response) => {
  const data = await createContactService(req.userAuthId, req.body);

  return res.status(StatusCodes.CREATED).json(data);
};

export default createContactController;
