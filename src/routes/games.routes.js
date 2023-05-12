import { Router } from "express";
import { allGames, newGame } from "../controllers/games.controllers.js";
import { validateGame } from "../middlewares/games.middleweare.js";

const gamesRouter = Router()

gamesRouter.get("/games", allGames)
gamesRouter.post("/games", validateGame, newGame)

export default gamesRouter