import { Client } from "../../entities/client.entity";
import { IAuth } from "../../interfaces/auth.interface";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authService = async (payload: IAuth): Promise<string> => {
  const clientRepo = AppDataSource.getRepository(Client);

  const findUser = await clientRepo.findOneBy({ email: payload.email });

  if (!findUser) {
    throw new AppError("Invalid email or password.", 401);
  }

  const validatePassword = await compare(payload.password, findUser.password);

  if (!validatePassword) {
    throw new AppError("Invalid email or password.", 401);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY!, {
    expiresIn: "1h",
    subject: findUser.id,
  });

  return token;
};

export default authService;
