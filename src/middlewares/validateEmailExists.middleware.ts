import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { Client } from "../entities/client.entity";
import AppDataSource from "../data-source";

const validateEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepo = AppDataSource.getRepository(Client);
  const clientEmail = await clientRepo.exist({
    where: { email: req.body.email },
  });

  if (clientEmail) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Email already exists." });
  }

  return next();
};

export default validateEmailExistsMiddleware;
