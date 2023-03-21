import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import AppError from "./appError";

const handlerError = (
  error: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(error.flatten().fieldErrors);
  }

  console.log(error);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error." });
};

export default handlerError;
