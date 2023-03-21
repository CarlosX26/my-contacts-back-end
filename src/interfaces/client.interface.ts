import { z } from "zod";
import {
  clientSchema,
  clientWithoutPasswordSchema,
} from "../schemas/client.schema";

type IClient = z.infer<typeof clientSchema>;

type IClientWithoutPassword = z.infer<typeof clientWithoutPasswordSchema>;

export { IClient, IClientWithoutPassword };
