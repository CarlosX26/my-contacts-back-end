import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validateSchemaMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedSchema = schema.parse(req.body);

    req.body = validatedSchema;

    return next();
  };

export default validateSchemaMiddleware;
