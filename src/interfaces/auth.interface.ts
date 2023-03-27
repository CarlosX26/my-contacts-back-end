import { z } from "zod";
import { authSchema } from "../schemas/auth.schema";

type IAuth = z.infer<typeof authSchema>;

export { IAuth };
