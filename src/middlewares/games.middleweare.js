import { gamesSchema } from "../schemas/games.schemas.js"

export async function validateGame(req, res, next) {
    const game = req.body
    const {error} = gamesSchema.validate(game)

    if(error){
        const erros = error.details.map((detail) => detail.message)
        return res.status(400).send({errors})
    }

    const gameExist = await db.query(`SELECT * FROM games WHERE name = $1;`, [game.name])
    if (gameExist.rowCount !== 0) return res.status(409).send("Jogo existente")
    res.locals.game = game

    next()
}