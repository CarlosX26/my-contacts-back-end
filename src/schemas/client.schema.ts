import { z } from "zod";

const clientSchema = z.object({
  fullName: z.string().max(128),
  email: z.string().email().max(128),
  phoneNumber: z.string().max(11).min(11),
  password: z.string().max(150),
});

const clientWithoutPasswordSchema = clientSchema
  .extend({
    createdAt: z.date(),
  })
  .omit({
    password: true,
  });

export { clientSchema, clientWithoutPasswordSchema };
