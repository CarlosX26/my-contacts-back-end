import { z } from "zod";
import { contactReturnSchema, contactSchema } from "../schemas/contact.schema";

type IContact = z.infer<typeof contactSchema>;

type IContactReturn = z.infer<typeof contactReturnSchema>;

export { IContact, IContactReturn };
