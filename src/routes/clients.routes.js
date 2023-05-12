import { Router } from "express";
import { allClients, insertClient, oneClient, updateClient } from "../controllers/clients.controllers.js";

const clientsRouter = Router()

clientsRouter.get("/customers", allClients)
clientsRouter.get("/customers/:id", oneClient)
clientsRouter.post("/customers", insertClient)
clientsRouter.put("/customers/:id", updateClient)

export default clientsRouter