import { Request } from "express";
import { Client } from "../../entities/client.entity";

declare global {
  namespace Express {
    interface Request {
      userAuth: Client;
    }
  }
}
