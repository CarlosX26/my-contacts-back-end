import "express-async-errors";
import express from "express";
import handlerError from "./errors/handler";

const app = express();

app.use(express.json());

app.use(handlerError);

export default app;
