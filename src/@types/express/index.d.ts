import { Request } from "express";
import { Contact } from "../../entities/contact.entity";

declare global {
  namespace Express {
    interface Request {
      userAuthId: string;
      contact: Contact;
    }
  }
}
