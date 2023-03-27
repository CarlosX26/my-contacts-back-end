import { Response } from "express";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import deleteClientService from "../../services/clients/deleteClient.service";

const deleteClientController = async (req: Request, res: Response) => {
  await deleteClientService(req.userAuthId);

  return res.status(StatusCodes.NO_CONTENT).send();
};

export default deleteClientController;
