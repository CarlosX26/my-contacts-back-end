import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import readClientService from "../../services/clients/readClient.service";

const readClientController = async (req: Request, res: Response) => {
  const data = await readClientService(req.userAuthId);

  return res.status(StatusCodes.OK).json(data);
};

export default readClientController;
