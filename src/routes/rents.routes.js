import { Router } from "express";
import { allRents, deleteRents, finishRents, newRents } from "../controllers/rents.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleweare.js";
import { finishValidate, rentsValidate } from "../middlewares/rents.middleware.js";
import rentsSchema from "../schemas/rents.schema.js";

const rentsRouter = Router ()

rentsRouter.post("/rentals", validateSchema(rentsSchema), rentsValidate, newRents)
rentsRouter.get("/rentals", allRents)
rentsRouter.post("/rentals/:id/return", finishValidate, finishRents)
rentsRouter.delete("/rentals/:id", deleteRents)

export default rentsRouter