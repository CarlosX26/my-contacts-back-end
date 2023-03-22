import { Contact } from "./../entities/contact.entity";
import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { StatusCodes } from "http-status-codes";

const checkContactExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactRepo = AppDataSource.getRepository(Contact);

  const contact = await contactRepo.findOneBy({
    id: req.params.id,
    client: { id: req.userAuthId },
  });

  if (!contact) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Contact not found." });
  }

  req.contact = contact;

  return next();
};

export default checkContactExistsMiddleware;
