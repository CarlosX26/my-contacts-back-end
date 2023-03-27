import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"
import { Client } from "../entities/client.entity"
import AppDataSource from "../data-source"

const validatePhoneNumberExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepo = AppDataSource.getRepository(Client)
  const clientPhoneNumber = await clientRepo
    .createQueryBuilder("clients")
    .where("clients.phoneNumber = :phoneNumber", {
      phoneNumber: req.body.phoneNumber,
    })
    .getOne()

  if (clientPhoneNumber) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "PhoneNumber already exists." })
  }

  return next()
}

export default validatePhoneNumberExistsMiddleware
