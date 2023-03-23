import { z } from "zod";
import {
  contactReturnSchema,
  contactSchema,
  contactUpdateSchema,
} from "../schemas/contact.schema";

type IContact = z.infer<typeof contactSchema>;

type IContactUpdate = z.infer<typeof contactUpdateSchema>;

type IContactReturn = z.infer<typeof contactReturnSchema>;

export { IContact, IContactReturn, IContactUpdate };
