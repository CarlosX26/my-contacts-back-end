import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().max(128),
  email: z.string().email().max(128),
  phoneNumber: z.string().max(11).min(11),
});

const contactReturnSchema = contactSchema.extend({
  createdAt: z.date(),
  id: z.string(),
});

export { contactSchema, contactReturnSchema };
