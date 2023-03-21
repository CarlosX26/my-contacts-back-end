import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authService from "../../services/auth/auth.service";

const authController = async (req: Request, res: Response) => {
  const data = await authService(req.body);

  return res.status(StatusCodes.OK).json(data);
};

export default authController;
