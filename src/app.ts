import "express-async-errors";
import express from "express";
import handlerError from "./errors/handler";
import authRouter from "./routers/auth.router";
import clientRouter from "./routers/clients.router";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/clients", clientRouter);

app.use(handlerError);

export default app;
