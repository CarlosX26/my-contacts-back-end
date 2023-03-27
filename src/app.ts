import "express-async-errors"
import express from "express"
import cors from "cors"
import handlerError from "./errors/handler"
import authRouter from "./routers/auth.router"
import clientRouter from "./routers/clients.router"
import contactRouter from "./routers/contacts.router"

const app = express()

app.use(express.json())

app.use(cors())

app.use("/auth", authRouter)
app.use("/clients", clientRouter)
app.use("/contacts", contactRouter)

app.use(handlerError)

export default app
