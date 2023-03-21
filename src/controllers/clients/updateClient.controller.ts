import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import updateClientService from "../../services/clients/updateClient.service";

const updateClientController = async (req: Request, res: Response) => {
  const data = await updateClientService(req.userAuthId, req.body);

  return res.status(StatusCodes.OK).json(data);
};

export default updateClientController;
