import { Client } from "../entities/client.entity";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppDataSource from "../data-source";
import AppError from "../errors/appError";

const validateEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepo = AppDataSource.getRepository(Client);

  const findEmail = await clientRepo.exist({
    where: { email: req.body.email },
  });

  if (findEmail) {
    throw new AppError("Email already exists.", StatusCodes.CONFLICT);
  }

  return next();
};

export default validateEmailMiddleware;
