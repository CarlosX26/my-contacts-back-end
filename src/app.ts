import "express-async-errors";
import express from "express";
import handlerError from "./errors/handler";
import authRouter from "./routers/auth.router";
import clientRouter from "./routers/clients.router";
import contactRouter from "./routers/contacts.router";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/clients", clientRouter);
app.use("/contacts", contactRouter);

app.use(handlerError);

export default app;
