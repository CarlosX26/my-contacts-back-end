import { z } from "zod";
import {
  clientSchema,
  clientUpdateSchema,
  clientWithoutPasswordSchema,
} from "../schemas/client.schema";

type IClient = z.infer<typeof clientSchema>;

type IClientUpdate = z.infer<typeof clientUpdateSchema>;

type IClientWithoutPassword = z.infer<typeof clientWithoutPasswordSchema>;

export { IClient, IClientWithoutPassword, IClientUpdate };
