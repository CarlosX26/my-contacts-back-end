import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppDataSource from "../data-source";
import { Client } from "../entities/client.entity";

const validateTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Missing token." });
  }

  jwt.verify(token, process.env.SECRET_KEY!, async (error, decode) => {
    if (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: error.message });
    }

    const clientRepo = AppDataSource.getRepository(Client);

    const client = await clientRepo.findOneBy({ id: String(decode?.sub) });

    req.userAuth = client!;
  });

  return next();
};

export default validateTokenMiddleware;
