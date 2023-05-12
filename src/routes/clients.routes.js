import { Router } from "express";
import { allClients, insertClient, oneClient, updateClient } from "../controllers/clients.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleweare.js";
import clientSchema from "../schemas/clients.schema.js";

const clientsRouter = Router()

clientsRouter.get("/customers", allClients)
clientsRouter.get("/customers/:id", oneClient)
clientsRouter.post("/customers", validateSchema(clientSchema), insertClient)
clientsRouter.post("/customers", updateClient)

export default clientsRouter