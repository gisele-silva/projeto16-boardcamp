import { Router } from "express";
import { allGames, newGame } from "../controllers/games.controllers.js";
import { gamesSchema } from "../schemas/games.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.middleweare.js";
import { gameValidate } from "../middlewares/game.middleware.js";

const gamesRouter = Router()

gamesRouter.get("/games", allGames)
gamesRouter.post("/games", validateSchema(gamesSchema), gameValidate ,newGame)

export default gamesRouter