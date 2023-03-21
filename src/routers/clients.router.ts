import { Router } from "express";
import createClientController from "../controllers/clients/createClient.controller";

const clientRouter = Router();

clientRouter.post("", createClientController);

export default clientRouter;
