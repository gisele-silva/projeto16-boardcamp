import { Router } from "express";
import { allClients, insertClient, oneClient, updateClient } from "../controllers/clients.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleweare.js";
import clientSchema from "../schemas/clients.schema.js";
import { clientsId, clientsValidate } from "../middlewares/clients.middleware.js";

const clientsRouter = Router()

clientsRouter.get("/customers", allClients)
clientsRouter.get("/customers/:id", clientsId, oneClient)
clientsRouter.post("/customers", validateSchema(clientSchema), clientsValidate, insertClient)
clientsRouter.put("/customers/:id", validateSchema(clientSchema), clientsValidate, updateClient)

export default clientsRouter