import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import readAllContactsService from "../../services/contacts/readAllContacts.service";

const readAllContactsController = async (req: Request, res: Response) => {
  const data = await readAllContactsService(req.userAuthId);

  return res.status(StatusCodes.OK).json(data);
};

export default readAllContactsController;
