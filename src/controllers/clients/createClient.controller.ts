import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import createClientService from "../../services/clients/createClient.service";

const createClientController = async (req: Request, res: Response) => {
  const data = await createClientService();

  return res.status(StatusCodes.CREATED).json(data);
};

export default createClientController;
