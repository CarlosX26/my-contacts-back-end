import { Client } from "../entities/client.entity";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppDataSource from "../data-source";
import AppError from "../errors/appError";

const validatePhoneNumberMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepo = AppDataSource.getRepository(Client);

  const findPhoneNumber = await clientRepo.exist({
    where: { phoneNumber: req.body.phoneNumber },
  });

  if (findPhoneNumber) {
    throw new AppError("PhoneNumber already exists.", StatusCodes.CONFLICT);
  }

  return next();
};

export default validatePhoneNumberMiddleware;
